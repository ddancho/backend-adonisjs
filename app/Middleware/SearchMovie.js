"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { sanitize } = use("Validator");

class SearchMovie {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.params
   * @param {Function} next
   */
  async handle({ request, params }, next) {
    const { movie } = this.sanitizeMovieParameter(params);

    request.movie = movie;

    await next();
  }

  sanitizeMovieParameter({ movie }) {
    const data = sanitize(
      { movie },
      {
        movie: "trim|escape|strip_links|strip_tags",
      }
    );

    return data;
  }
}

module.exports = SearchMovie;
