const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (password) {
      if (password.length < 3) {
        return response.status(400).json({
          error: "Password length should be more than 3 characters",
        });
      }

      const salt = 10;
      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        username,
        name,
        password: passwordHash,
      });

      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } else {
      response.status(400).json({
        error: "Password is required.",
      });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/signin", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = userRouter;
