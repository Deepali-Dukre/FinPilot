const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');

const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return next(new AppError('Not authenticated', 401));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    return next(new AppError('Invalid or expired session', 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) return next(new AppError('Not authenticated', 401));

  req.user = user;
  next();
});

const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };

module.exports = { protect, authorize };
