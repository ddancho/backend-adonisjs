"use strict";

const Database = use("Database");

class CategoryRules {
  async isTitleExists(data, field, message, args, get) {
    const title = get(data, field);
    if (!title) {
      return;
    }

    const [table, column] = args;
    const row = await Database.table(table).where(column, title).first();
    if (!row) {
      throw message;
    }
  }
}

module.exports = CategoryRules;
