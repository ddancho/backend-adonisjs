"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { sanitize } = use("Validator");

class FilterMovie {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const filterInput = request.only(["comparison", "duration"]);

    const filterData = this.sanitizeFilterInput(
      filterInput.comparison,
      filterInput.duration
    );

    if (filterData.comparison === null || filterData.duration === null) {
      return response.status(400).json({
        message:
          "Bad filter parameters, comparison operators : greater, less and duration : movie length (min)",
      });
    }

    request.filterData = filterData;

    await next();
  }

  sanitizeFilterInput(comparisonInput = null, durationInput = null) {
    let comparison = null;
    let duration = null;

    if (comparisonInput) {
      comparison = sanitize(
        { comparisonInput: String(comparisonInput).toLowerCase() },
        {
          comparisonInput: "trim|escape|strip_links|strip_tags",
        }
      );

      if (
        comparison.comparisonInput !== "greater" &&
        comparison.comparisonInput !== "less"
      ) {
        comparison = null;
      } else {
        comparison.comparisonInput =
          comparison.comparisonInput === "greater" ? ">" : "<";
      }
    }

    if (durationInput) {
      duration = sanitize(
        { durationInput },
        {
          durationInput: "trim|escape|strip_links|strip_tags",
        }
      );

      if (Number.isNaN(Number(duration.durationInput))) {
        duration = null;
      }
    }

    return {
      comparison: comparison?.comparisonInput ?? null,
      duration: duration?.durationInput ?? null,
    };
  }
}

module.exports = FilterMovie;
