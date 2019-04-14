"use strict";
const Recipes = require("./handlers/recipes");
const Assets = require("./handlers/assets");
const Pages = require("./handlers/page")
console.log(Assets);
module.exports = [
  {
    method: "GET",
    path: "/",
    handler: Pages.home
  },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "public"
      }
    }
  },
  {
    method: "GET",
    path: "/api/recipes",
    handler: Recipes.find
  },
  {
    method: "GET",
    path: "/api/recipes/{id}",
    handler: Recipes.findOne
  },
  {
    method: "POST",
    path: "/api/recipes",
    config: {
      auth: "api"
    },
    handler: Recipes.create
  }
];
