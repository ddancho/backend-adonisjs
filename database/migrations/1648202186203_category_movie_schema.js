"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoryMovieSchema extends Schema {
  up() {
    this.create("category_movie", (table) => {
      table.increments();
      table.integer("category_id").unsigned().notNullable();
      table.integer("movie_id").unsigned().notNullable();
    });
  }

  down() {
    this.drop("category_movie");
  }
}

module.exports = CategoryMovieSchema;
