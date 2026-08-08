const express = require('express');
const { listCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', listCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
