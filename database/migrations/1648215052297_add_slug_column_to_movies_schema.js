"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddSlugColumnToMoviesSchema extends Schema {
  up() {
    this.table("movies", (table) => {
      table.string("slug").notNullable().unique().index();
    });
  }

  down() {
    this.table("movies", (table) => {
      table.dropColumn("slug");
    });
  }
}

module.exports = AddSlugColumnToMoviesSchema;
