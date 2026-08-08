const express = require('express');
const {
  listUsers,
  getUser,
  updateUserRole,
  toggleUserActive,
  getAdminStats,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', listUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id/role', updateUserRole);
router.patch('/users/:id/toggle-active', toggleUserActive);

module.exports = router;
