const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/Blog.js");

const api = supertest(app);
const testToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI2NTY1MDk3NzVkN2U4NTU1MjY0N2E3YTEiLCJpYXQiOjE3MDExMjAzOTd9.kJ6n7-DH1Mc3msM9PT9jUOiFH0eW3mixDyi93X74lhg";

const initialBlogs = [
  {
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
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of initialBlogs) {
    const newBlog = new Blog({ ...blog, user: "656509775d7e85552647a7a1" });
    await newBlog.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blog");
  expect(response.body).toHaveLength(2);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blog");
  expect(response.body[0].id).toBeDefined();
});

test("add blog post to the database successfully", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 0,
  };

  await api.post("/api/blog").set("Authorization", testToken).send(blog);

  const response = await api.get("/api/blog");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await Blog.deleteMany({});
  await api.post("/api/blog").set("Authorization", testToken).send(blog);

  const response = await api.get("/api/blog");
  expect(response.body[0].likes).toBe(0);
});

test("if the title or url properties are missing the backend responds with the status code 400", async () => {
  const blog1 = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };
  const blog2 = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
  };
  const blog3 = {
    author: "Edsger W. Dijkstra",
  };

  await api
    .post("/api/blog")
    .set("Authorization", testToken)
    .send(blog1)
    .expect(400);
  await api
    .post("/api/blog")
    .set("Authorization", testToken)
    .send(blog2)
    .expect(400);
  await api
    .post("/api/blog")
    .set("Authorization", testToken)
    .send(blog3)
    .expect(400);
});

test("delete single blog", async () => {
  let response = await api.get("/api/blog");
  await api
    .delete(`/api/blog/${response.body[0].id}`)
    .set("Authorization", testToken)
    .expect(200);
  response = await api.get("/api/blog");
  expect(response.body).toHaveLength(1);
});

test("update single blog", async () => {
  let response = await api.get("/api/blog");
  const temp = response.body[0];
  const newBlog = {
    ...temp,
    likes: +temp.likes + 1,
  };
  const updated = await api.put(`/api/blog/${temp.id}`).send(newBlog);
  expect(updated.request._data.likes).toBe(1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
