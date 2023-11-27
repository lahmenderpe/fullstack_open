const jwt = require("jsonwebtoken");

const userExtractor = (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken;
  } catch (error) {
    response
      .status(401)
      .send("Something went wrong while extracting the user from token");
  }
  next();
};

module.exports = userExtractor;
