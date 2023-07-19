const express = require("express");
const db = require("./db");
const adminRouter = require("./routes/admin.route");
const departmentRouter = require("./routes/department.route");
const visitorRouter = require("./routes/visitor.route");
const cors = require("cors");

const app = express();
const port = 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// ROUTES
app.use("/admin", adminRouter);
app.use("/department", departmentRouter);
app.use("/visitor", visitorRouter);

// START THE APP
app.listen(port, () => {
  console.log(`Serving Listening on ${port}`);
  db.connect();
});
