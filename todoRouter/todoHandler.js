const express = require("express");
const router = express.Router();
const Todo = require("../schemas/todoSchema");

// get all the todo's
router.get("/", async (req, res) => {
  try {
    const filter = { status: "active" }; // use filter if we need to get specific condition data
    const result = await Todo.find(filter).select({ _id: 1, title: 1 }); // use select if we need just specific fields
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// post  the todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.send(newTodo);
  } catch (err) {
    console.log(err);
  }
});

// post multiple todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
});

// update the todo
router.put("/:id", async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
});

// delete the todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
