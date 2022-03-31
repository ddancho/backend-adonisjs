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

    Model.filterAndPaginate = async function ({
      comparison,
      duration,
      page,
      pageSize,
    }) {
      const direction = comparison === ">" ? "desc" : "asc";

      return await Model.query()
        .with("categories", (builder) => builder.select("title"))
        .where("movie_length", comparison, duration)
        .orderBy("movie_length", direction)
        .paginate(page, pageSize);
    };
  }
}

module.exports = MovieLength;
