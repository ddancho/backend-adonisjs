"use strict";

const Database = use("Database");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

// seed categories table with default values for movie category
// thriller, horror, drama, fantasy, comedy, action
// command : adonis seed --files CategorySeeder.js
class CategorySeeder {
  async run() {
    const isTableExist = await Database.schema.hasTable("categories");
    if (isTableExist) {
      await Database.table("categories").insert([
        {
          id: 1,
          title: "thriller",
          slug: this.createSlug("thriller"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
        {
          id: 2,
          title: "horror",
          slug: this.createSlug("horror"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
        {
          id: 3,
          title: "drama",
          slug: this.createSlug("drama"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
        {
          id: 4,
          title: "fantasy",
          slug: this.createSlug("fantasy"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
        {
          id: 5,
          title: "comedy",
          slug: this.createSlug("comedy"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
        {
          id: 6,
          title: "action",
          slug: this.createSlug("action"),
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        },
      ]);
    }
  }

  createSlug(title) {
    const slug = title + "-" + uuidv4();
    return slugify(slug, {
      lower: true,
      strict: true,
    });
  }
}

module.exports = CategorySeeder;
