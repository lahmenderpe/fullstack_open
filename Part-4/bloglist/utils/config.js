require("dotenv").config()

const MONGODB_URL = process.env.NODE_ENV === "test" ? process.env.MONGODB_URL_TEST : process.env.MONGODB_URL
const PORT = process.env.PORT || 3003

module.exports = {
  MONGODB_URL,
  PORT
}