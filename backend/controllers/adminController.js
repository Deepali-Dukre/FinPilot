const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const listUsers = catchAsync(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const search = req.query.search?.trim();

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: users,
    meta: { total, page, pages: Math.ceil(total / limit) || 1 },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.json({ success: true, data: user });
});

const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return next(new AppError('Invalid role', 400));
  if (req.params.id === String(req.user._id)) {
    return next(new AppError('You cannot change your own role', 400));
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) return next(new AppError('User not found', 404));
  res.json({ success: true, data: user });
});

const toggleUserActive = catchAsync(async (req, res, next) => {
  if (req.params.id === String(req.user._id)) {
    return next(new AppError('You cannot deactivate your own account', 400));
  }

  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  user.isActive = !user.isActive;
  await user.save();
  res.json({ success: true, data: user });
});

const getAdminStats = catchAsync(async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalUsers, totalTransactions, newUsersThisMonth] = await Promise.all([
    User.countDocuments(),
    Transaction.countDocuments(),
    User.countDocuments({ createdAt: { $gte: startOfMonth } }),
  ]);

  res.json({ success: true, data: { totalUsers, totalTransactions, newUsersThisMonth } });
});

module.exports = { listUsers, getUser, updateUserRole, toggleUserActive, getAdminStats };
