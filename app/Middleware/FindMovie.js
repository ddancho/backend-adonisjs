"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Movie = use("App/Models/Movie");
const { sanitize } = use("Validator");

class FindMovie {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.params
   * @param {Function} next
   */
  async handle({ request, response, params: { id, asSlug } }, next) {
    let movie = null;

    if (asSlug) {
      // sanitize id and asSlug query parameters
      const data = this.sanitizeIdAndSlug(id, asSlug);

      if (!data.asSlug) {
        return response.status(404).json({
          message:
            "Something went wrong, please check slug and asSlug parameters",
        });
      }

      movie = await Movie.findBy("slug", data.id);
    } else {
      // sanitize id query parameters
      const data = this.sanitizeId(id);

      if (!data) {
        return response.status(404).json({
          message: "Something went wrong, please check id parameter",
        });
      }

      movie = await Movie.find(data.id);
    }

    if (!movie) {
      const msg = `Movie search with - ${
        asSlug ? "slug : " : "id : "
      }${id} failed`;

      return response.status(404).json({
        message: msg,
      });
    }

    await movie.load("categories");

    request.movie = movie.toJSON();

    await next();
  }

  sanitizeIdAndSlug(id, asSlug) {
    const data = sanitize(
      { id, asSlug },
      {
        id: "trim|escape|strip_links|strip_tags",
        asSlug: "trim|escape|strip_links|strip_tags",
      }
    );

    if (data.asSlug !== "1") {
      data.asSlug = false;
    } else {
      data.asSlug = true;
    }

    return data;
  }

  sanitizeId(id) {
    if (Number.isNaN(Number(id))) {
      return null;
    }

    const data = sanitize(
      { id },
      {
        id: "trim|escape|strip_links|strip_tags",
      }
    );

    return data;
  }
}

module.exports = FindMovie;
