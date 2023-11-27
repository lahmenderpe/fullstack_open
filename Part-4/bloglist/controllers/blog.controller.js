const blogRouter = require("express").Router();
const Blog = require("../models/Blog.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const authHandler = require("../middleware/getToken.js");
const userExtractor = require("../middleware/userExtractor.js");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post(
  "/",
  [authHandler, userExtractor],
  async (request, response, next) => {
    const user = request.user;

    if (!user.id) {
      return response.status(400).send("Invalid token");
    }

    try {
      const { title, url } = request.body;
      if (!title || !url) {
        return response.status(400).send();
      }
      const blog = new Blog({
        ...request.body,
        user: user.id,
      });
      const savedBlog = await blog.save();
      const newUser = await User.findById(user.id);
      newUser.blogs = newUser.blogs.concat(savedBlog._id);
      await newUser.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  "/:id",
  [authHandler, userExtractor],
  async (request, response, next) => {
    const { id } = request.params;
    const user = request.user;

    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return response.status(404).send("Blog does not exist");
      }
      const userId = blog.user;
      if (userId.toString() === user.id.toString()) {
      } else {
        return response
          .status(400)
          .send("You are not authorized to delete this blog post");
      }
      await Blog.findByIdAndDelete(id);
      response.status(200).send("Blog deleted");
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.put("/:id", authHandler, async (request, response, next) => {
  try {
    const { id } = request.params;
    const updated = await Blog.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).send("Resource not found");
    }

    response.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
