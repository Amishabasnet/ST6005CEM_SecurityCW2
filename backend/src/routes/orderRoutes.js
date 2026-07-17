const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const {
  placeOrderValidationRules,
  orderIdParamValidationRules,
  updateOrderStatusValidationRules,
} = require('../validators/orderValidator');

const router = express.Router();

router.use(protect);

router.post('/', placeOrderValidationRules, validate, placeOrder);
router.get('/my-orders', getMyOrders);
router.get('/admin/all', authorize('admin'), getAllOrders);
router.get('/:id', orderIdParamValidationRules, validate, getOrderById);
router.put('/:id/cancel', orderIdParamValidationRules, validate, cancelOrder);
router.put(
  '/:id/status',
  authorize('admin'),
  updateOrderStatusValidationRules,
  validate,
  updateOrderStatus
);

module.exports = router;
