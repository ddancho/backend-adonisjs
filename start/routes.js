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
  // optional asSlug parameter accepts 1 (true) to search for the movie with the slug identifier
  // such as /movies/the-batman-b842e08c-71ad-4e8d-a0d6-672f3d09a954/1
  // otherwise search is done for the movie with the id identifier
  // such as /movies/15
  /*----------------------------------------------------------------------------------------- */
  Route.get("movies", "MovieController.index");
  /*------------------------------- filter route -------------------------------------------- */
  // accepts query strings parameters comparison, duration and page
  // comparison : greater, less
  // duration : movie length in minutes
  // page : page input for pagination (if not present in the qs defaults to 1)
  // pageSize : pageSize input for pagination (if not present in the qs defaults to 3)
  // movies/filter/?comparison=greater&duration=50&page=1
  /*----------------------------------------------------------------------------------------- */
  Route.get("movies/filter", "MovieController.filter").middleware(
    "filterMovie"
  );
  Route.get("movies/:id/:asSlug?", "MovieController.show").middleware(
    "findMovie"
  );
  Route.post("movies", "MovieController.store").validator("StoreMovie");
  Route.patch("movies/:id/:asSlug?", "MovieController.update")
    .middleware("findMovie")
    .validator("UpdateMovie");
  Route.delete("movies/:id/:asSlug?", "MovieController.delete").middleware(
    "findMovie"
  );

  /*-------------------------- Category Controller routes -------------------------------------- */
  // optional asSlug parameter accepts 1 (true) to search for the category with the slug identifier
  // such as /category/action-0f511e57-c1f1-4fa8-9de1-c5140a1a16b8/1
  // otherwise search is done for the category with the id identifier
  // such as /category/15
  /*----------------------------------------------------------------------------------------- */
  Route.get("categories", "CategoryController.index");
  Route.get("categories/:id/:asSlug?", "CategoryController.show").middleware(
    "findCategory"
  );
  Route.post("categories", "CategoryController.store").validator(
    "StoreCategory"
  );
  Route.patch("categories/:id/:asSlug?", "CategoryController.update")
    .middleware("findCategory")
    .validator("UpdateCategory");
  Route.delete(
    "categories/:id/:asSlug?",
    "CategoryController.delete"
  ).middleware("findCategory");
}).prefix("api/v1");
