const { Router } = require("express");
const db = require("../db");

// Router
const visitRouter = Router();

visitRouter.get("/", (req, res) => {
  // DB call
  db.getVisits()
    .then((results) => {
      const visits = results[0];
      res.status(200).json({ visits });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

visitRouter.post("/", (req, res) => {
  // In case of post request, get body parameters like this
  const { visitor_id, purpose, checkintime, checkouttime, dept_id } = req.body;

  db.createVisit({ visitor_id, purpose, checkintime, checkouttime, dept_id })
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(400).json({ message: "Visit couldn't be created" });
      } else {
        res.status(201).json({ message: "Visit created" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

module.exports = visitRouter;
