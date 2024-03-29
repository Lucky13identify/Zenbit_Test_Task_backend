const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// import of routes
const authRouter = require("./routes/api/auth-routes");
const dealsRouter = require("./routes/api/deals-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// global middlewares:
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", dealsRouter);
app.use("/api/auth", authRouter);
app.use("/api/deals", dealsRouter);

// other middlewares
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
