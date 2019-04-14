"use strict";
const Recipes = require("./handlers/recipes");
const Assets = require("./handlers/assets");
const Pages = require("./handlers/page");
const Actions = require("./handlers/actions")

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: Pages.home
  },
  {
    method: "GET",
    path: "/login",
    handler: Pages.login
  },
  {
    method: "POST",
    path: "/login",
    config: {
      payload: {
        output: 'data'
      }
    },
    handler: Actions.login
  },
  {
    method: "GET",
    path: "/recipes/{id}",
    handler: Pages.viewRecipe
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
    method: "GET",
    path: "/api/recipes/page/{pageNum}",
    handler: Recipes.pageQuery
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
