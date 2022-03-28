"use strict";

class StoreMovie {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required|string",
      description: "required|string",
      author: "required|string",
      rating: "required|integer",
      //rating: "required|integer|range:1,10",
      "categories.*.title": "required|string",
      "categories.*.is_active": "required|boolean",
    };
  }

  get sanitizationRules() {
    return {
      title: "trim|escape|strip_links|strip_tags",
      description: "trim|escape|strip_links|strip_tags",
      author: "trim|escape|strip_links|strip_tags",
      rating: "trim|escape|strip_links|strip_tags|to_Int",
      "categories.*.title": "trim|escape|strip_links|strip_tags",
      "categories.*.is_active": "trim|escape|strip_links|strip_tags|to_Boolean",
    };
  }

  get messages() {
    return {
      "title.required": "Title field is required",
      "title.string": "Title data type has to be a string",
      "description.required": "Description field is required",
      "description.string": "Description data type has to be a string",
      "author.required": "Author field is required",
      "author.string": "Author data type has to be a string",
      "rating.required": "Rating field is required",
      "rating.integer": "Rating data type has to be a integer",
      //"rating.range": "Rating range is 1 to 10",
      "categories.*.title.required": "Category.title field is required",
      "categories.*.title.string":
        "Category.title data type has to be a string",
      "categories.*.is_active.required": "Category.is_active field is required",
      "categories.*.is_active.boolean":
        "Category.is_active data type has to be a boolean",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = StoreMovie;