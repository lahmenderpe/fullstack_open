const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config.js")
const blogRouter = require("./controllers/blog.controller.js")
const {
  info,
  error
} = require("./utils/logger.js")

// middlewares
app.use(cors())
app.use(express.json())

// routers
app.use("/api/blogs", blogRouter)


info('connecting to MongoDB...')

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message)
  })

module.exports = app