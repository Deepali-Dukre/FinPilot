const catchAsync = require('../utils/catchAsync');
const Transaction = require('../models/Transaction');

const getSummary = catchAsync(async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const totals = await Transaction.aggregate([
    { $match: { user: req.user._id, date: { $gte: startOfMonth } } },
    { $group: { _id: '$type', total: { $sum: '$amount' } } },
  ]);

  const income = totals.find((t) => t._id === 'income')?.total || 0;
  const expense = totals.find((t) => t._id === 'expense')?.total || 0;

  res.json({
    success: true,
    data: {
      totalBalance: income - expense,
      income,
      expense,
      savings: income - expense,
    },
  });
});

const getMonthlyTrend = catchAsync(async (req, res) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const results = await Transaction.aggregate([
    { $match: { user: req.user._id, date: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  const months = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  const trend = months.map(({ year, month }) => {
    const income = results.find(
      (r) => r._id.year === year && r._id.month === month && r._id.type === 'income'
    )?.total || 0;
    const expense = results.find(
      (r) => r._id.year === year && r._id.month === month && r._id.type === 'expense'
    )?.total || 0;
    return {
      label: new Date(year, month - 1).toLocaleString('default', { month: 'short' }),
      income,
      expense,
    };
  });

  res.json({ success: true, data: trend });
});

const getRecentTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id })
    .populate('category', 'name type')
    .sort({ date: -1 })
    .limit(5);

  res.json({ success: true, data: transactions });
});

module.exports = { getSummary, getMonthlyTrend, getRecentTransactions };
