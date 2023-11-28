const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    console.log("error validation");
    return response.status(401).json({
      error: error.message,
    });
  } else if (error.name === "CastError") {
    console.log("error cast");
    return response.status(400).send("malformatted id");
  }

  next(error);
};

module.exports = errorHandler;
