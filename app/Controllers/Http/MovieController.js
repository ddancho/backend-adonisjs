"use strict";

const Movie = use("App/Models/Movie");
const Category = use("App/Models/Category");
const Pivot = use("App/Models/MovieCategory");
const Database = use("Database");

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

  async store({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      const { title, description, author, rating, categories } = request.post();

      // get movie category titles into array
      const categoryTitles = categories.map((c) => c.title);

      // check if the category titles are set active, if not update
      await Category.query(trx)
        .where("is_active", 0)
        .whereIn("title", categoryTitles)
        .update({ is_active: 1 });

      // get category models required for this movie
      const categoryData = (
        await Category.query(trx).whereIn("title", categoryTitles).fetch()
      ).toJSON();

      // create movie record
      const movie = await Movie.create(
        { title, description, author, rating },
        trx
      );
      const movieData = movie.toJSON();

      // prepare data for the pivot table
      // create array [{category_id, movie_id}]
      const pivotData = categoryData.map((c) => {
        return {
          category_id: c.id,
          movie_id: movieData.id,
        };
      });

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
    const { title, description, author, rating } = request.post();

    try {
      movie.title = title;
      movie.description = description;
      movie.author = author;
      movie.rating = rating;

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
