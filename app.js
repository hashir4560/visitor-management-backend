const express = require("express");
const db = require("./db");
const adminRouter = require("./routes/admin.route");
const departmentRouter = require("./routes/department.route");
const visitorRouter = require("./routes/visitor.route");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const getUserFromToken = require("./middleware/get-user-from-token");
const visitRouter = require("./routes/visit.route");

const app = express();
const port = 3001;

// MIDDLEWARE
app.use(cors({ allowedHeaders: "*" }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("*", getUserFromToken);

// ROUTES
app.use("/admin", adminRouter);
app.use("/department", departmentRouter);
app.use("/visitor", visitorRouter);
app.use("/auth", authRouter);
app.use("/visit", visitRouter);

// START THE APP
app.listen(port, () => {
  console.log(`Serving Listening on ${port}`);
  db.connect();
});
