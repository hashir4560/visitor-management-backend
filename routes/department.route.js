const { Router } = require("express");
const db = require("../db");

//Create A Router
const departmentRouter = Router();
departmentRouter.get("/", (req, res) => {
  db.getDepartments()
    .then((results) => {
      const department = results[0];
      res.status(200).json({ department });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.sqlMessage,
      });
    });
});

departmentRouter.post("/", (req, res) => {
  const { name } = req.body;
  db.createDepartment({ name })
    .then((result) => {
      const info = result[0];
      if (info.affectedRows === 0) {
        res.status(400).json({ message: "New Department is not added" });
      } else {
        res.status(201).json({
          message: "New Department is added ",
          data: { id: info.insertId },
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});

departmentRouter.put("/name", (req, res) => {
  const { dept_id, name } = req.body;
  db.updateName({
    dept_id,
    name,
  })
    .then((results) => {
      const info = results[0];
      if (info.affectedRows === 0) {
        res.status(404).json({
          message: "Department with this name  exists",
        });
      } else {
        res.status(200).json({
          message: "Department Update",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
departmentRouter.delete("/:dept_id", (req, res) => {
  const dept_id = req.params;
  db.deleteDepartment(dept_id)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "Department not found",
        });
      } else {
        res.status(200).json({
          message: "Department deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.sqlMessage });
    });
});

departmentRouter.post("/bulk-delete", (req, res) => {
  const { ids } = req.body;
  db.deleteDepartments(ids)
    .then((results) => {
      if (results.affectedRows === 0) {
        res.status(400).json({
          message: "No department deleted",
        });
      } else {
        res.status(200).json({
          message: "Department(s) deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
});
module.exports = departmentRouter;
