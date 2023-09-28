const express = require("express");
const router = express.Router();
const Todo = require("../schemas/todoSchema");

// get all the todo's
router.get("/", async () => {});

// post  the todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.send(newTodo);
});

// post multiple todo
router.post("/all", async () => {});

// update the todo
router.put("/:id", async () => {});

// delete the todo
router.delete("/:id", async () => {});

module.exports = router;
