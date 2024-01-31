const express = require("express");
const resetRouter = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

resetRouter.post("/", async (req, res, next) => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = resetRouter;
