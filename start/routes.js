"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(use("App/Routes/Category")).prefix("api/v1");
Route.group(use("App/Routes/Movie")).prefix("api/v1");
Route.group(use("App/Routes/User")).prefix("api/v1");

Route.any("*", ({ response }) => {
  return response.status(404).json({
    message: "Resource not found",
  });
});
