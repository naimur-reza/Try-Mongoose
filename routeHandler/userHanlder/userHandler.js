const express = require("express");
const router = express.Router();
const User = require("../../schemas/userSchema");
const bcrypt = require("bcrypt");

// signup
router.post("/signup", async (req, res) => {
  const { name, password, status, userName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userInfo = { name, password: hashedPassword, status, userName };
  const newUser = new User(userInfo);
  await newUser.save();
  res.status(200).send("Signup successful!");
});

module.exports = router;
