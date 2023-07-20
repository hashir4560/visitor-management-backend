const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = "keyboard cat";

const generateToken = (payload) => sign(payload, JWT_SECRET);

const verifyToken = (token) => {
  try {
    const payload = verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
