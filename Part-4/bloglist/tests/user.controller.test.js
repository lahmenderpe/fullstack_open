const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");

const api = supertest(app);

test("User is not created if the username is not provided", async () => {
  const testUser = {
    name: "testname",
    password: "testpass",
  };

  let response = await api.post("/api/user/signup").send(testUser).expect(401);

  expect(response.body.error).toBe(
    "User validation failed: username: Path `username` is required."
  );
});

test("User is not created if the password is not provided", async () => {
  const testUser = {
    username: "testuser",
    name: "testname",
  };

  let response = await api.post("/api/user/signup").send(testUser).expect(401);

  expect(response.body.error).toBe("Password is required.");
});

afterAll(async () => {
  await mongoose.connection.close();
});
