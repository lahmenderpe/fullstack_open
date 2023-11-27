const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const User = require("../models/User");

const api = supertest(app);

const initialUsers = [
  {
    username: "user1",
    name: "user1",
    password: "password1",
  },
  {
    username: "user2",
    name: "user2",
    password: "password2",
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of initialUsers) {
    const newUser = new User(user);
    await newUser.save();
  }
});

test("User is not created if the username is not provided", async () => {
  const testUser = {
    name: "testname",
    password: "testpass",
  };

  let response = await api.post("/api/user/signin").send(testUser).expect(401);

  expect(response.body.error).toBe("invalid username or password");

  response = await api.get("/api/user");
  expect(response.body).toHaveLength(2);
});

test("User is not created if the password is not provided", async () => {
  const testUser = {
    username: "testuser",
    name: "testname",
  };

  let response = await api.post("/api/user/signin").send(testUser).expect(401);

  expect(response.body.error).toBe("invalid username or password");

  response = await api.get("/api/user");
  expect(response.body).toHaveLength(2);
});

afterAll(async () => {
  await mongoose.connection.close();
});
