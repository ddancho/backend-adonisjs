"use strict";

const Category = use("App/Models/Category");
const Pivot = use("App/Models/MovieCategory");
const Database = use("Database");

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

  async show({ request, response }) {
    response.ok({
      message: "Requested category record found",
      data: request.category,
    });
  }

  async update({ request, response }) {
    const category = request.category;
    const data = request.post();

    try {
      category.merge(data);

      await category.save();

      response.ok({
        message: "Successfully updated category",
        data: category,
      });
    } catch (error) {
      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }

  async delete({ request, response }) {
    const category = request.category;

    const trx = await Database.beginTransaction();

    await category.save(trx);

    try {
      const categoryId = category.toJSON().id;

      await Pivot.query(trx).where("category_id", categoryId).delete();

      await category.delete();

      await trx.commit();

      response.ok({
        message: "Successfully deleted category",
      });
    } catch (error) {
      await trx.rollback();

      return response.status(500).send({
        message: "Something went wrong",
        error,
      });
    }
  }
}

module.exports = CategoryController;
