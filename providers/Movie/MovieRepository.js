"use strict";

const Movie = use("App/Models/Movie");
const Pivot = use("App/Models/MovieCategory");
const Database = use("Database");
const CategoryRepository = use("Category/Repository");

class MovieRepository {
  async store(request) {
    const trx = await Database.beginTransaction();

    try {
      const {
        title,
        description,
        author,
        rating,
        movieLength: movie_length,
        categories,
        movieDetails,
      } = request.post();

      // movie details are not required
      const movie_details = movieDetails ? JSON.stringify(movieDetails) : "{}";

      // set is_active if necessary
      await CategoryRepository.setIsActive(trx, categories);

      // create movie record
      const movie = await Movie.create(
        { title, description, author, rating, movie_length, movie_details },
        trx
      );

      const movieId = movie.toJSON().id;

      // prepare data for pivot table
      const pivotData = await CategoryRepository.getPivotData(trx, movieId);

      // create pivot record(s)
      await Pivot.createMany(pivotData, trx);

      // go go go
      await trx.commit();

      return movie;
    } catch (error) {
      await trx.rollback();
      return error;
    }
  }

  async update(request, movie) {
    const {
      movieLength: movie_length,
      movieDetails: movie_details,
      ...data
    } = request.post();

    if (movie_length) {
      data.movie_length = movie_length;
    }
    if (movie_details) {
      data.movie_details = JSON.stringify(movie_details);
    }

    movie.merge(data);

    await movie.save();
  }
}

module.exports = MovieRepository;
