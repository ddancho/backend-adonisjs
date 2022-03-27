"use strict";

const Movie = use("App/Models/Movie");

class MovieController {
  async index({ response }) {
    const movies = await Movie.query()
      .with("categories", (builder) =>
        builder.select("title", "is_active", "slug")
      )
      .fetch();

    return response.status(200).json({
      message: "Movies with belonging categories",
      data: movies.toJSON(),
    });
  }

  async store({ request, response }) {
    try {
      const { title, description, author, rating, categories } = request.post();

      const movie = await Movie.create({ title, description, author, rating });
      await movie.categories().createMany(categories);

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
}

module.exports = MovieController;
