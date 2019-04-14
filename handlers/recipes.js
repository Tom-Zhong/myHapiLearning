"use strict";

exports.find = function(request, reply) {
  // return reply('Here the books will be shown soon...');
  const sql = "SELECT * FROM recipes";
  const params = [];

  if (request.query.cuisine) {
    sql += " WHERE cusine = ?";
    params.push(request.query.cuisine);
  }
  this.db.all(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    }
    reply(res);
  });
};

exports.findOne = function(request, reply) {
  this.db.get(
    "SELECT * FROM recipes WHERE id = ?",
    [request.params.id],
    (err, result) => {
      if (err) {
        throw err;
      }

      if (typeof result !== "undefined") {
        return reply(result);
      }

      return reply("Not found").code(404);
    }
  );
};

// 分页器
exports.pageQuery = function(request, reply) {
  this.db.all(
    "SELECT * FROM recipes LIMIT ?,3",
    [request.params.pageNum * 3 - 3 > 0 ? request.params.pageNum * 3 - 3 : 0],
    (err, result) => {
      if (err) {
        throw err;
      }

      if (typeof result !== "undefined") {
        return reply(result);
      }

      return reply("Not found").code(404);
    }
  );
};
exports.create = function(request, reply) {
  const sql =
    "INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?,?,?,?,?,?,?,?)";

  this.db.run(
    sql,
    [
      request.payload.name,
      request.payload.cooking_time,
      request.payload.prep_time,
      request.payload.serves,
      request.payload.cuisine,
      request.payload.ingredients,
      request.payload.directions,
      request.auth.credentials.id
    ],
    err => {
      if (err) {throw err};

      reply({ status: "ok" });
    }
  );
};
