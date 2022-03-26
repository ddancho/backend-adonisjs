"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterDescrColumnInMoviesSchema extends Schema {
  up() {
    this.table("movies", (table) => {
      table.text("description").notNullable().alter();
    });
  }

  down() {
    this.table("movies", (table) => {
      table.string("description").notNullable();
    });
  }
}

module.exports = AlterDescrColumnInMoviesSchema;
