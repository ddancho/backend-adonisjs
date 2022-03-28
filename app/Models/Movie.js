"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Movie extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "GenerateSlugHook.create");
  }

  categories() {
    return this.belongsToMany("App/Models/Category").pivotModel(
      "App/Models/MovieCategory"
    );
  }
}

module.exports = Movie;
