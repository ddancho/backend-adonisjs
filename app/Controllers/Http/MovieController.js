"use strict";

const Movie = use("App/Models/Movie");
const Pivot = use("App/Models/MovieCategory");
const Database = use("Database");
const Axios = use("Axios");
const MovieRepository = use("Movie/Repository");

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
    try {
      const movie = await MovieRepository.store(request);

      return response.created({
        message: "Successfully created a new movie record",
        data: movie,
      });
    } catch (error) {
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

    try {
      await MovieRepository.update(request, movie);

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
