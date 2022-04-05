"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

module.exports = {
  /*
  // RapidAPI Hub
  // https://rapidapi.com/hub
  */
  imdb: {
    method: "GET",
    url: "https://imdb-data-searching.p.rapidapi.com/om",
    headers: {
      "X-RapidAPI-Host": "imdb-data-searching.p.rapidapi.com",
      "X-RapidAPI-Key": Env.get("RAPID_API_KEY"),
    },
  },
  /*
  // testing
  // JSONPlaceholder
  // https://jsonplaceholder.typicode.com/
  */
  users: {
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
  },
};
