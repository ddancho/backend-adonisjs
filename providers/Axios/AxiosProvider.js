"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class AxiosProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.bind("Axios", (app) => {
      const Config = app.use("Adonis/Src/Config");
      const Axios = require("./Axios");

      return new Axios(Config);
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

module.exports = AxiosProvider;
