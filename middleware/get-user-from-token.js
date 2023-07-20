const { verifyToken } = require("../utils/jwt");

const getUserFromToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const [, token] = authorization.split(" ");
    if (token) {
      const user = verifyToken(token);
      if (user) {
        req.user = user;
      }
    }
  }
  next();
};

module.exports = getUserFromToken;
