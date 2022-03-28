"use strict";

class StoreCategory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required|string",
      is_active: "boolean",
    };
  }

  get sanitizationRules() {
    return {
      title: "trim|escape|strip_links|strip_tags",
      is_active: "trim|escape|strip_links|strip_tags",
    };
  }

  get messages() {
    return {
      "title.required": "Title field is required",
      "title.string": "Title data type has to be a string",
      "is_active.boolean": "Is_active data type has to be a boolean",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = StoreCategory;
