"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { sanitize } = use("Validator");

class FilterMovie {
  constructor() {
    this.DEFAULT_PAGE = 1;
    this.DEFAULT_PAGE_SIZE = 3;
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const { ...filterInput } = request.only([
      "comparison",
      "duration",
      "page",
      "pageSize",
    ]);

    const filterData = this.sanitizeFilterInput(
      filterInput.comparison,
      filterInput.duration,
      filterInput.page,
      filterInput.pageSize
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

  sanitizeFilterInput(
    comparisonInput = null,
    durationInput = null,
    pageInput = this.DEFAULT_PAGE,
    pageSizeInput = this.DEFAULT_PAGE_SIZE
  ) {
    let comparison = null;
    let duration = null;
    let page = null;
    let pageSize = null;

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

    page = sanitize(
      { pageInput },
      {
        pageInput: "trim|escape|strip_links|strip_tags",
      }
    );

    if (page.pageInput === "" || Number.isNaN(Number(page.pageInput))) {
      page.pageInput = this.DEFAULT_PAGE;
    }

    pageSize = sanitize(
      { pageSizeInput },
      {
        pageSizeInput: "trim|escape|strip_links|strip_tags",
      }
    );

    if (
      pageSize.pageSizeInput === "" ||
      Number.isNaN(Number(pageSize.pageSizeInput))
    ) {
      pageSize.pageSizeInput = this.DEFAULT_PAGE_SIZE;
    }

    return {
      comparison: comparison?.comparisonInput ?? null,
      duration: duration?.durationInput ?? null,
      page: page.pageInput,
      pageSize: pageSize.pageSizeInput,
    };
  }
}

module.exports = FilterMovie;
