"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  static boot() {
    super.boot();
    this.addHook("beforeCreate", "GenerateSlugHook.create");
  }

  movies() {
    return this.belongsToMany("App/Models/Movie");
  }
}

module.exports = Category;
