"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MovieSchema extends Schema {
  up() {
    this.create("movies", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.string("author").notNullable();
      table.integer("rating").unsigned().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("movies");
  }
}

module.exports = MovieSchema;
