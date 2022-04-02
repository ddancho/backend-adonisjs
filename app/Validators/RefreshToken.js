"use strict";

class RefreshToken {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      refreshToken: "required|string",
    };
  }

  get sanitizationRules() {
    return {
      refreshToken: "trim|escape|strip_links|strip_tags",
    };
  }

  get messages() {
    return {
      "refreshToken.required": "Refresh token field is required",
      "refreshToken.string": "Refresh token data type has to be a string",
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }
}

module.exports = RefreshToken;
