const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadProductImages } = require('../middleware/uploadMiddleware');
const { validate } = require('../validators/authValidator');
const {
  createProductValidationRules,
  updateProductValidationRules,
  getProductsValidationRules,
} = require('../validators/productValidator');

const router = express.Router();

// Public routes
router.get('/', getProductsValidationRules, validate, getProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post(
  '/',
  protect,
  authorize('admin'),
  uploadProductImages,
  createProductValidationRules,
  validate,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  uploadProductImages,
  updateProductValidationRules,
  validate,
  updateProduct
);

router.delete('/:id', protect, authorize('admin'), deleteProduct);

router.patch('/:id/stock', protect, authorize('admin'), updateStock);

module.exports = router;
