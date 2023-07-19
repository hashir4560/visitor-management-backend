const { Router } = require("express");
const db = require("../db");

// STEP 1: Create a router
const visitorRouter = Router();

// STEP 2: Create the endpoints

// Two parts "path" and "controller" (function)
visitorRouter.get("/", (req, res) => {
  // DB call
  db.getVisitors()

    // Success condition
    .then((results) => {
      const visitors = results[0];
      res.status(200).json({ visitors });
    })

    // Error condition
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
module.exports = visitorRouter;
