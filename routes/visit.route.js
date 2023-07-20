const { Router } = require("express");
const db = require("../db");
//Router
const visitRouter = Router();

visitRouter.get("/", (req, res) => {
  // DB call
  db.getVisits()

    // Success condition
    .then((results) => {
      const visits = results[0];
      res.status(200).json({ visits });
    })

    // Error condition
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });

  module.exports = visitorRouter;
});
module.exports = visitRouter;
