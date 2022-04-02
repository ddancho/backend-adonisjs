"use strict";

const Route = use("Route");

module.exports = () => {
  /*-------------------------- Category Controller routes -------------------------------------- */

  /*----------------------------------------------------------------------------------------- */
  // returns all category the records
  /*----------------------------------------------------------------------------------------- */
  Route.get("categories", "CategoryController.index");

  /*-------------------------- search id/slug route -------------------------------------------- */
  // optional asSlug parameter accepts 1 (true) to search for the category with the slug identifier
  // such as /category/action-0f511e57-c1f1-4fa8-9de1-c5140a1a16b8/1
  // otherwise search is done for the category with the id identifier
  // such as /category/15
  /*-------------------------------------------------------------------------------------------- */
  Route.get("categories/:id/:asSlug?", "CategoryController.show").middleware(
    "findCategory"
  );

  /*----------------------------------------------------------------------------------------- */
  // create new category record
  // body : title, is_active( default = false )
  // created : thriller, horror, drama, fantasy, comedy, action
  /*----------------------------------------------------------------------------------------- */
  Route.post("categories", "CategoryController.store").validator(
    "StoreCategory"
  );

  /*----------------------------------------------------------------------------------------- */
  // update category record
  // body : required one or more of the following fields :
  // title, is_active
  /*----------------------------------------------------------------------------------------- */
  Route.patch("categories/:id/:asSlug?", "CategoryController.update")
    .middleware("findCategory")
    .validator("UpdateCategory");

  /*----------------------------------------------------------------------------------------- */
  // delete category record
  // params : id / slug of the category
  /*----------------------------------------------------------------------------------------- */
  Route.delete(
    "categories/:id/:asSlug?",
    "CategoryController.delete"
  ).middleware("findCategory");
};
