"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddSlugColumnToCategoriesSchema extends Schema {
  up() {
    this.table("categories", (table) => {
      table.string("slug").notNullable().unique().index();
    });
  }

  down() {
    this.table("categories", (table) => {
      table.dropColumn("slug");
    });
  }
}

module.exports = AddSlugColumnToCategoriesSchema;
