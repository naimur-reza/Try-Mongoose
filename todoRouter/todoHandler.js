const express = require("express");
const router = express.Router();
const Todo = require("../schemas/todoSchema");

// get all the todo's
router.get("/", async () => {});

// post  the todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "Something is wrong",
      });
    } else {
      res.status(200).json({
        message: "Todo inserted successful!",
      });
    }
  });
});

// post multiple todo
router.post("/all", async () => {});

// update the todo
router.put("/:id", async () => {});

// delete the todo
router.delete("/:id", async () => {});

module.exports = router;
