const express = require('express');
const {
  getSummary,
  getMonthlyTrend,
  getRecentTransactions,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/summary', getSummary);
router.get('/trend', getMonthlyTrend);
router.get('/recent-transactions', getRecentTransactions);

module.exports = router;
