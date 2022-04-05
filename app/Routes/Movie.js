"use strict";

const Route = use("Route");

module.exports = () => {
  /*-------------------------- Movie Controller routes -------------------------------------- */

  /*----------------------------------------------------------------------------------------- */
  // returns all the movie records
  /*----------------------------------------------------------------------------------------- */
  Route.get("movies", "MovieController.index");

  /*-------------------------- search id/slug route ----------------------------------------- */
  // optional asSlug parameter accepts 1 (true) to search for the movie with the slug identifier
  // such as /movies/the-batman-b842e08c-71ad-4e8d-a0d6-672f3d09a954/1
  // otherwise search is done for the movie with the id identifier
  // such as /movies/15
  /*----------------------------------------------------------------------------------------- */
  Route.get("movies/:id/:asSlug?", "MovieController.show").middleware(
    "findMovie"
  );

  /*------------------------------- filter route -------------------------------------------- */
  // accepts query strings parameters : comparison, duration, page, pageSize
  // comparison : greater, less
  // duration : movie length in minutes
  // page : page input for pagination (if not present in the qs defaults to 1)
  // pageSize : pageSize input for pagination (if not present in the qs defaults to 3)
  // movies/filter/?comparison=greater&duration=50&page=1
  /*----------------------------------------------------------------------------------------- */
  Route.get("movies/filter", "MovieController.filter").middleware(
    "filterMovie"
  );

  /*----------------------------------------------------------------------------------------- */
  // create new movie record
  // body : title, description, author, rating, movieLength, categories([category_title])
  // category titles to select : thriller, horror, drama, fantasy, comedy, action
  /*----------------------------------------------------------------------------------------- */
  Route.post("movies", "MovieController.store").validator("StoreMovie");

  /*----------------------------------------------------------------------------------------- */
  // update movie record
  // body : required one or more of the following fields :
  // title, description, author, rating, movieLength
  /*----------------------------------------------------------------------------------------- */
  Route.patch("movies/:id/:asSlug?", "MovieController.update")
    .middleware("findMovie")
    .validator("UpdateMovie");

  /*----------------------------------------------------------------------------------------- */
  // delete movie record
  // params : id / slug of the movie
  /*----------------------------------------------------------------------------------------- */
  Route.delete("movies/:id/:asSlug?", "MovieController.delete").middleware(
    "findMovie"
  );

  /*----------------------------------------------------------------------------------------- */
  // search for the movie, controller redirects search to the external rest api service
  // params : correct title of the movie
  // returns : movie details
  // title, year, rated, released, runtime, genre, director, writer, actors, plot,
  // language, country, awards, metascore, imdbRating, imdbVotes, type
  /*----------------------------------------------------------------------------------------- */
  Route.get(
    "moviesSearch/byTitle/:movie",
    "MovieController.searchByTitle"
  ).middleware("searchMovie");

  /*----------------------------------------------------------------------------------------- */
  // search for the movie, controller redirects search to the external rest api service
  // params : keyword for search
  // returns : search : aray of the results, totalResults, response
  // [{title,year,imdbID, type, poster}, ...]
  /*----------------------------------------------------------------------------------------- */
  Route.get(
    "moviesSearch/byKeyword/:movie",
    "MovieController.searchByKeyword"
  ).middleware("searchMovie");
};
