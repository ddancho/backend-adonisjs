"use strict";

const axios = require("axios");

class Axios {
  constructor(Config) {
    this.options = Config.get("axios.imdb");
  }

  async searchResource(params = {}) {
    this.options.params = params;

    try {
      const response = await axios(this.options);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

module.exports = Axios;
