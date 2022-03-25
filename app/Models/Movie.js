"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Movie extends Model {
  categories() {
    return this.belongsToMany("App/Models/Category");
  }
}

module.exports = Movie;
