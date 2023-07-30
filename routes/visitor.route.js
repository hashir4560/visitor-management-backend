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
visitorRouter.post("/", (req, res) => {
  // In case of post request, get body parameters like this
  const { name, email, phone, cnic } = req.body;

  db.createVisitor({ name, email, phone, cnic })
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(400).json({ message: "Visitor couldn't be created" });
      } else {
        res.status(201).json({ message: "Visitor created" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
visitorRouter.delete("/:id", (req, res) => {
  const id = req.params;
  db.deleteVisitor(id)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "Vsitor not found",
        });
      } else {
        res.status(200).json({
          message: "Vsitor deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.sqlMessage });
    });
});
visitorRouter.post("/bulk-delete", (req, res) => {
  const { ids } = req.body;
  if (!ids?.length) {
    return res.status(400).json({ message: "No visitor selected to delete" });
  }
  db.deleteVisitors(ids)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(400).json({
          message: "No visitor deleted",
        });
      } else {
        res.status(200).json({
          message: "Vsitors deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
module.exports = visitorRouter;
