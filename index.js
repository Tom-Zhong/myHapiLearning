"use strict";

const Hapi = require("hapi");
const Sqlite3 = require("sqlite3");

const db = new Sqlite3.Database("./dindin.sqlite");

const server = new Hapi.Server();
server.connection({ port: 4000 });

// server.bind({  });

server.bind({
  apiBaseUrl: "http://localhost:4000/api",
  webBaseUrl: "http://localhost:4000",
  db: db
});
const validateFunc = function(token, callback) {
  // 去数据库里面寻找token，如果找的到的话即通过验证，允许修改，其实跟session_id是一样的
  db.get("SELECT * FROM users WHERE token = ?", [token], (err, result) => {
    if (err) {
      return callback(err, false);
    }

    const user = result;

    if (!user) {
      return callback(null, false);
    }

    callback(null, true, {
      id: user.id,
      username: user.username
    });
  });
};

server.register(
  [require("hapi-auth-bearer-token"), require("inert"), require("vision")],
  err => {
    if (err) {
      throw err;
    }
    server.views({
      engines: {
          hbs: require('handlebars')
      },
      relativeTo: __dirname,
      path: './views',
      layoutPath: './views/layout',
      layout: true,
      isCached: false,
      partialsPath: './views/partials',
      helpersPath: './views/helpers'
  });
    server.auth.strategy("api", "bearer-access-token", {
      validateFunc: validateFunc
    });

    server.route(require("./route"));

    server.start(err => {
      if (err) {
        throw err;
      }
      console.log("Server listening at:", server.info.uri);
    });
  }
);
