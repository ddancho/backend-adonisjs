"use strict";

const Category = use("App/Models/Category");

class CategoryRepository {
  constructor() {
    this.categoryTitles = [];
  }

  async setIsActive(trx, categories) {
    // get movie category titles into array
    this.categoryTitles = categories.map((c) => c.title);

    // check if the category titles are set active, if not update
    await Category.query(trx)
      .where("is_active", 0)
      .whereIn("title", this.categoryTitles)
      .update({ is_active: 1 });
  }

  async getPivotData(trx, movieId) {
    // get category models required for this movie
    const categoryData = (
      await Category.query(trx).whereIn("title", this.categoryTitles).fetch()
    ).toJSON();

    // prepare data for the pivot table
    // create array [{category_id, movie_id}]
    const pivotData = categoryData.map((c) => {
      return {
        category_id: c.id,
        movie_id: movieId,
      };
    });

    return pivotData;
  }
}

module.exports = CategoryRepository;
