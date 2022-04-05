"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddMovieDetailsColumnToMoviesSchema extends Schema {
  up() {
    this.table("movies", (table) => {
      table.json("movie_details");
    });
  }

  down() {
    this.table("movies", (table) => {
      table.dropColumn("movie_details");
    });
  }
}

module.exports = AddMovieDetailsColumnToMoviesSchema;
