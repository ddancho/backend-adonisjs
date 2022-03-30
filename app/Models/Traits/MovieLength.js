"use strict";

class MovieLength {
  register(Model, customOptions = {}) {
    Model.queryMacro("filter", function ({ comparison, duration }) {
      const direction = comparison === ">" ? "desc" : "asc";

      this.where("movie_length", comparison, duration).orderBy(
        "movie_length",
        direction
      );

      return this;
    });
  }
}

module.exports = MovieLength;
