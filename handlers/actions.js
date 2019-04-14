const Wreck = require("wreck");

// 登录逻辑
exports.login = function(request, reply) {
  // console.log(request.auth.credentials.token !== '')
  this.db.get(
    "SELECT * FROM USERS WHERE username = ? and password = ?",
    [request.payload.username, request.payload.password],
    (err, payload) => {
      if (err) {
        throw err;
      }
      request.cookieAuth.set({
        token: payload.token
      });
      request.cookieAuth.ttl(15000)
      reply.redirect(this.webBaseUrl)
    }
  );
};
