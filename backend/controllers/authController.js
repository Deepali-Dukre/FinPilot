const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Category = require('../models/Category');
const DEFAULT_CATEGORIES = require('../data/defaultCategories');
const {
  signAccessToken,
  signRefreshToken,
  accessCookieOptions,
  refreshCookieOptions,
} = require('../utils/tokens');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  currency: user.currency,
});

const issueSession = async (res, user) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await user.save({ validateBeforeSave: false });

  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
};

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Name, email and password are required', 400));
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return next(new AppError('Email is already registered', 409));

  const isFirstUser = (await User.countDocuments()) === 0;
  const user = await User.create({
    name,
    email,
    password,
    role: isFirstUser ? 'admin' : 'user',
  });

  await Category.insertMany(
    DEFAULT_CATEGORIES.map((c) => ({ ...c, user: user._id, isDefault: true }))
  );

  await issueSession(res, user);
  res.status(201).json({ success: true, data: sanitizeUser(user) });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Email and password are required', 400));

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }
  if (!user.isActive) return next(new AppError('This account has been deactivated', 403));

  await issueSession(res, user);
  res.json({ success: true, data: sanitizeUser(user) });
});

const logout = catchAsync(async (req, res) => {
  if (req.user) {
    req.user.refreshTokenHash = undefined;
    await req.user.save({ validateBeforeSave: false });
  }
  res.clearCookie('accessToken', accessCookieOptions);
  res.clearCookie('refreshToken', refreshCookieOptions);
  res.json({ success: true, data: null });
});

const refresh = catchAsync(async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) return next(new AppError('Not authenticated', 401));

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    return next(new AppError('Session expired, please log in again', 401));
  }

  const user = await User.findById(decoded.id).select('+refreshTokenHash');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  if (!user || !user.isActive || user.refreshTokenHash !== tokenHash) {
    return next(new AppError('Session expired, please log in again', 401));
  }

  const accessToken = signAccessToken(user._id);
  res.cookie('accessToken', accessToken, accessCookieOptions);
  res.json({ success: true, data: sanitizeUser(user) });
});

const getMe = catchAsync(async (req, res) => {
  res.json({ success: true, data: sanitizeUser(req.user) });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });

  // Always respond the same way, whether or not the account exists, to avoid leaking which emails are registered.
  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    // No email provider configured yet — log the link so it can be used in dev.
    console.log(`Password reset link for ${user.email}: ${resetUrl}`);
  }

  res.json({
    success: true,
    message: 'If that email is registered, a reset link has been sent.',
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) return next(new AppError('New password is required', 400));

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  }).select('+resetPasswordTokenHash +resetPasswordExpires');

  if (!user) return next(new AppError('Reset link is invalid or has expired', 400));

  user.password = password;
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: 'Password has been reset, please log in.' });
});

module.exports = { register, login, logout, refresh, getMe, forgotPassword, resetPassword };
