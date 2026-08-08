const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Category = require('../models/Category');

const listCategories = catchAsync(async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.type) filter.type = req.query.type;

  const categories = await Category.find(filter).sort({ isDefault: -1, name: 1 });
  res.json({ success: true, data: categories });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name, type } = req.body;
  if (!name || !['income', 'expense'].includes(type)) {
    return next(new AppError('A name and a valid type (income/expense) are required', 400));
  }

  const category = await Category.create({ user: req.user._id, name: name.trim(), type });
  res.status(201).json({ success: true, data: category });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
  if (!category) return next(new AppError('Category not found', 404));
  if (category.isDefault) return next(new AppError('Default categories cannot be deleted', 400));

  await category.deleteOne();
  res.json({ success: true, data: null });
});

module.exports = { listCategories, createCategory, deleteCategory };
