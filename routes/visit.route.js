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

visitRouter.get("/past", (req, res) => {
  // DB call
  db.getPastVisits()
    .then((results) => {
      const Pastvisits = results[0];
      res.status(200).json({ Pastvisits });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
visitRouter.post("/", (req, res) => {
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
visitRouter.put("/:id/checkout", (req, res) => {
  const { id } = req.params;
  db.checkout(id)
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(404).json({ message: "Current Visit Not found" });
      } else {
        res.status(200).json({ message: "Checkout successful" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error deleting visit", error: err.sqlMessage });
    });
});

visitRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deleteVisit(id)
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(404).json({ message: "Visit not found" });
      } else {
        res.status(200).json({ message: "Visit deleted" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error deleting visit", error: err.sqlMessage });
    });
});

module.exports = visitRouter;
