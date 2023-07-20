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
module.exports = visitorRouter;
