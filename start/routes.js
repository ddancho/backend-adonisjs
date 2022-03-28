"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  /*-------------------------- Movie Controller routes -------------------------------------- */
  Route.get("movies", "MovieController.index");
  // optional asSlug parameter accepts 1 (true) to search for the movie with the slug identifier
  // such as /movies/the-batman-b842e08c-71ad-4e8d-a0d6-672f3d09a954/1
  // otherwise search for the movie with the id identifier
  // such as /movies/15
  Route.get("movies/:id/:asSlug?", "MovieController.show").middleware(
    "findMovie"
  );
  Route.post("movies", "MovieController.store").validator("StoreMovie");
  // same logic to routing as with get one movie
  Route.patch("movies/:id/:asSlug?", "MovieController.update")
    .middleware("findMovie")
    .validator("UpdateMovie");
  // same logic to routing as with get one movie
  Route.delete("movies/:id/:asSlug?", "MovieController.delete").middleware(
    "findMovie"
  );

  /*-------------------------- Category Controller routes -------------------------------------- */
  Route.get("categories", "CategoryController.index");
  Route.post("categories", "CategoryController.store").validator(
    "StoreCategory"
  );
}).prefix("api/v1");
