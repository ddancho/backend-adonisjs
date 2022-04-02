"use strict";

class LoginUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }

  get sanitizationRules() {
    return {
      email: "trim|escape|strip_links|strip_tags",
      password: "trim|escape|strip_links|strip_tags",
    };
  }

  get messages() {
    return {
      "email.required": "Email field is required",
      "email.email": "Email value is not a valid email address",
      "password.required": "Password field is required",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = LoginUser;
