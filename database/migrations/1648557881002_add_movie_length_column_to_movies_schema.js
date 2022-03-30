"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddMovieLengthColumnToMoviesSchema extends Schema {
  up() {
    this.table("movies", (table) => {
      table.integer("movie_length").notNullable().index();
    });
  }

  down() {
    this.table("movies", (table) => {
      table.dropColumn("movie_length");
    });
  }
}

module.exports = AddMovieLengthColumnToMoviesSchema;
