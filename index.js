require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler/todoHandler");
const userHandler = require("./routeHandler/userHanlder/userHandler");
// middle wares
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// router

app.use("/todo", todoHandler);
app.use("/user", userHandler);

// default error handlers
app.use((err, req, res, next) => {
  if (err.headersSent) {
    return next(err);
  }

  res.status(500).send({ error: err });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
