const { Router } = require("express");
const db = require("../db");

// STEP 1: Create a router
const adminRouter = Router();

// STEP 2: Create the endpoints

// Two parts "path" and "controller" (function)
adminRouter.get("/", (req, res) => {
  // DB call
  db.getAdmins()

    // Success condition
    .then((results) => {
      const admins = results[0];
      res.status(200).json({ admins });
    })

    // Error condition
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

adminRouter.post("/", (req, res) => {
  // In case of post request, get body parameters like this
  const { first_name, last_name, username } = req.body;

  db.createAdmin({ first_name, last_name, username })
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(400).json({ message: "Admin couldn't be created" });
      } else {
        res
          .status(201)
          .json({ message: "Admin created", data: { id: info.insertId } });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

adminRouter.put("/password", (req, res) => {
  const { username, password } = req.body;
  db.updatePassword({
    username,
    password,
  })
    .then((results) => {
      const info = results[0];
      if (info.affectedRows === 0) {
        res.status(404).json({
          message: "Admin with this username not exists",
        });
      } else {
        res.status(200).json({
          message: "Password Updated",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

module.exports = adminRouter;
