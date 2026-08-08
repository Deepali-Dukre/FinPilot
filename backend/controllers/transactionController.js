const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Transaction = require('../models/Transaction');

const listTransactions = catchAsync(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const { search, type, category, paymentMethod, startDate, endDate } = req.query;

  const filter = { user: req.user._id };
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .populate('category', 'name type')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Transaction.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: transactions,
    meta: { total, page, pages: Math.ceil(total / limit) || 1 },
  });
});

const createTransaction = catchAsync(async (req, res, next) => {
  const { title, amount, type, category, date, notes, paymentMethod } = req.body;
  if (!title || !amount || !type || !category) {
    return next(new AppError('Title, amount, type and category are required', 400));
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    title,
    amount,
    type,
    category,
    date,
    notes,
    paymentMethod,
  });
  res.status(201).json({ success: true, data: transaction });
});

const updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!transaction) return next(new AppError('Transaction not found', 404));
  res.json({ success: true, data: transaction });
});

const deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!transaction) return next(new AppError('Transaction not found', 404));
  res.json({ success: true, data: null });
});

module.exports = { listTransactions, createTransaction, updateTransaction, deleteTransaction };
