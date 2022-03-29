"use strict";

class UpdateMovie {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "string",
      description: "string",
      author: "string",
      rating: "integer",
    };
  }

  get sanitizationRules() {
    return {
      title: "trim|escape|strip_links|strip_tags",
      description: "trim|escape|strip_links|strip_tags",
      author: "trim|escape|strip_links|strip_tags",
      rating: "trim|escape|strip_links|strip_tags|to_Int",
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
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = UpdateMovie;
