const blogRouter = require("express").Router()
const Blog = require("../models/Blog.js")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {
    title,
    url
  } = request.body

  if (!title || !url) {
    return response.status(400).send()
  }

  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete("/:id", async (request, response) => {
  const {
    id
  } = request.params

  await Blog.findByIdAndDelete(id)
  response.status(200).send()
})

blogRouter.put("/:id", async (request, response) => {
  const {
    id
  } = request.params

  await Blog.findByIdAndUpdate(id, request.body, {
    new: true
  })

  response.status(200).send()
})


module.exports = blogRouter