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
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body);
  res.send(req.body);
});

// update the todo
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.send(result);
});

// delete the todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).send("Deleted");
});

module.exports = router;
