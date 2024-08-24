const AppError = require("./appError");
const { ValidationError } = require("express-validation");

const GlobalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || false;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(err);
    let error = { ...err };
    error.message = err.message;

    if (err instanceof ValidationError) error = handleValidationError(err);

    sendErrorProd(err, req, res);
  }
};

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log the error for internal purposes
    console.error("ERROR 💥:", err);

    // Send a generic message to the client
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  } 
};

const handleValidationError = (err) => {
  const message = Object.values(err.details)
    .map((el) => el.message)
    .join(". ");
  return new AppError(message, 400);
};

module.exports = GlobalErrorHandler;
