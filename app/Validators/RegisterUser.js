"use strict";

class RegisterUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required|string",
      email: "required|email|unique:users",
      password: "required|confirmed|min:6",
    };
  }

  get sanitizationRules() {
    return {
      username: "trim|escape|strip_links|strip_tags",
      email: "trim|escape|strip_links|strip_tags",
      password: "trim|escape|strip_links|strip_tags",
    };
  }

  get messages() {
    return {
      "username.required": "Username field is required",
      "username.string": "Username data type has to be a string",
      "email.required": "Email field is required",
      "email.email": "Email value is not a valid email address",
      "email.unique": "Email value already exists",
      "password.required": "Password field is required",
      "password.confirmed": "Password and confirm password fields do not match",
      "password.min": "Password value must be at least 6 characters long",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = RegisterUser;
