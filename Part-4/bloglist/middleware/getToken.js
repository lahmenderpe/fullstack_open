const authHandler = (request, response, next) => {
  const authorization = request?.headers?.authorization;

  if (!authorization && !authorization?.startsWith("Bearer ")) {
    return response.status(401).send("Invalid token");
  }

  const token = authorization.split("Bearer ")[1];
  request.token = token;
  next();
};

module.exports = authHandler;
