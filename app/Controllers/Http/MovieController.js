"use strict";

const Movie = use("App/Models/Movie");
const Pivot = use("App/Models/MovieCategory");
const Database = use("Database");
const CategoryRepository = use("Category/Repository");
const Axios = use("Axios");

class MovieController {
  async index({ response }) {
    const movies = await Movie.query()
      .with("categories", (builder) => builder.select("title"))
      .fetch();

    return response.status(200).json({
      message: "Movies with belonging categories",
      data: movies.toJSON(),
    });
  }

  async filter({ request, response }) {
    const { data: records, ...rest } = (
      await Movie.filterAndPaginate(request.filterData)
    ).toJSON();

    return response.status(200).json({
      message: "Filter and paginated movies list",
      data: { ...rest, records },
    });
  }

  async searchByTitle({ request, response }) {
    const title = request.movie;
    const params = { t: title };

    try {
      const resource = await Axios.searchResource(params);

      return response.status(200).json({
        message: "Movie",
        resource,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async searchByKeyword({ request, response }) {
    const keyword = request.movie;
    const params = { s: keyword };

    try {
      const resources = await Axios.searchResource(params);

      return response.status(200).json({
        message: "Movies",
        resources,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const {
        title,
        description,
        author,
        rating,
        movieLength: movie_length,
        categories,
      } = request.post();

      // set is_active if necessary
      await CategoryRepository.setIsActive(trx, categories);

      // create movie record
      const movie = await Movie.create(
        { title, description, author, rating, movie_length },
        trx
      );

      const movieId = movie.toJSON().id;

      // prepare data for pivot table
      const pivotData = await CategoryRepository.getPivotData(trx, movieId);

      // create pivot record(s)
      await Pivot.createMany(pivotData, trx);

      // go go go
      await trx.commit();

      return response.created({
        message: "Successfully created a new movie record",
        data: movie,
      });
    } catch (error) {
      await trx.rollback();

      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async show({ request, response }) {
    response.ok({
      message: "Requested movie record found",
      data: request.movie,
    });
  }

  async update({ request, response }) {
    const movie = request.movie;
    const data = request.post();

    try {
      movie.merge(data);

      await movie.save();

      response.ok({
        message: "Successfully updated movie",
        data: movie,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async delete({ request, response }) {
    const movie = request.movie;

    const trx = await Database.beginTransaction();

    await movie.save(trx);

    try {
      const movieId = movie.toJSON().id;

      await Pivot.query(trx).where("movie_id", movieId).delete();

      await movie.delete();

      await trx.commit();

      response.ok({
        message: "Successfully deleted movie",
      });
    } catch (error) {
      await trx.rollback();

      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }
}

module.exports = MovieController;
