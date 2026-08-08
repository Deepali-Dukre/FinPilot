const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === 'CastError') {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(', ');
    error = new AppError(`Duplicate value for field: ${field}`, 409);
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    error = new AppError(message, 400);
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    error = new AppError('Invalid or expired session', 401);
  }

  const statusCode = error.statusCode || 500;
  if (!error.isOperational) console.error(err);

  res.status(statusCode).json({
    success: false,
    message: error.isOperational ? error.message : 'Something went wrong',
  });
};

module.exports = { notFound, errorHandler };
