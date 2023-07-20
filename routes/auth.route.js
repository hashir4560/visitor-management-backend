const { Router } = require("express");
const db = require("../db");
const { generateToken } = require("../utils/jwt");

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.verifyCredentials({ email, password })
    .then((results) => {
      const user = results[0][0][0];

      if (user) {
        const token = generateToken(user);

        res.status(200).json({ token, user });
      } else {
        res.status(401).json({ message: "Incorrect set of credentials" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

authRouter.get("/me", (req, res) => {
  const { user } = req;
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ message: "Out of session" });
  }
});

module.exports = authRouter;
