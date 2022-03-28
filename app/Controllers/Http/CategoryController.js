"use strict";

const Category = use("App/Models/Category");

class CategoryController {
  async index({ response }) {
    const categories = await Category.query()
      .with("movies", (builder) => builder.select("title"))
      .fetch();

    return response.status(200).json({
      message: "Movie categories",
      data: categories.toJSON(),
    });
  }

  async store({ request, response }) {
    try {
      const { title, is_active = false } = request.post();

      const category = await Category.create({ title, is_active });

      return response.created({
        message: "Successfully created a new category record",
        data: category,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }
}

module.exports = CategoryController;
