const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app.js")
const Blog = require("../models/Blog.js")

const api = supertest(app)

const initialBlogs = [{
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
})

test("notes are returned as json", async () => {
  await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
})

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(2)
})

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
})

test("add blog post to the database successfully", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0,
  }

  await api.post("/api/blogs").send(blog).expect(201)
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  }

  await Blog.deleteMany({})
  await api.post("/api/blogs").send(blog).expect(201)
  const response = await api.get("/api/blogs")
  expect(response.body[0].likes).toBe(0)
})

test("if the title or url properties are missing the backend respondswith the status code 400", async () => {
  const blog1 = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
  }
  const blog2 = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
  }

  const blog3 = {
    author: "Edsger W. Dijkstra",
  }

  await api.post("/api/blogs").send(blog1).expect(400)
  await api.post("/api/blogs").send(blog2).expect(400)
  await api.post("/api/blogs").send(blog3).expect(400)
})

test("delete single blog", async () => {
  let response = await api.get("/api/blogs")
  await api.delete(`/api/blogs/${response.body[0].id}`).expect(200)
  response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(1)
})

test("update single blog", async () => {
  let response = await api.get("/api/blogs")
  const temp = response.body[0]
  const newBlog = {
    ...temp,
    likes: temp.likes + 1
  }
  await api.put(`/api/blogs/${temp.id}`).send(newBlog).expect(200)
  response = await api.get("/api/blogs")
  expect(response.body[0].likes).toBe(1)
})

afterAll(async () => {
  await mongoose.connection.close()
})