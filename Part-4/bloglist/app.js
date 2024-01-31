const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
const blogRouter = require("./controllers/blog.controller.js");
const userRouter = require("./controllers/user.controller.js");
const { info, error } = require("./utils/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

if (process.env.NODE_ENV === "test") {
  const resetRouter = require("./controllers/reset.controller.js");
  app.use("/api/reset", resetRouter);
}

// middlewares
app.use(cors());
app.use(express.json());

// routers
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.use(errorHandler);

info("connecting to MongoDB...");

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => {
    error("error connecting to MongoDB:", err.message);
  });

module.exports = app;
