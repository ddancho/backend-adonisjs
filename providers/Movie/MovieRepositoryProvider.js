"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class MovieRepositoryProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.bind("Movie/Repository", () => {
      const MovieRepository = require("./MovieRepository");
      return new MovieRepository();
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
  boot() {}
}

module.exports = MovieRepositoryProvider;
