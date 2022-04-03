"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class CategoryRulesProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("Category/Validator", () => {
      const CategoryRules = require("./CategoryRules");
      return new CategoryRules();
    });
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Validator = use("Validator");

    Validator.extend("isExists", (data, field, message, args, get) => {
      const CategoryValidator = this.app.use("Category/Validator");

      return CategoryValidator.isTitleExists(data, field, message, args, get);
    });
  }
}

module.exports = CategoryRulesProvider;
