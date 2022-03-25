"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  movies() {
    return this.belongsToMany("App/Models/Movie");
  }
}

module.exports = Category;
