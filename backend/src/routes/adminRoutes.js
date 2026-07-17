const express = require('express');
const {
  getStats,
  getRecentOrders,
  getLowStockProducts,
  getDashboard,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const {
  statsValidationRules,
  recentOrdersValidationRules,
  lowStockValidationRules,
  dashboardValidationRules,
} = require('../validators/adminValidator');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', dashboardValidationRules, validate, getDashboard);
router.get('/stats', statsValidationRules, validate, getStats);
router.get('/recent-orders', recentOrdersValidationRules, validate, getRecentOrders);
router.get('/low-stock-products', lowStockValidationRules, validate, getLowStockProducts);

module.exports = router;
