const express = require('express');
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  getAllUsers,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  validate,
  registerValidationRules,
  loginValidationRules,
  updateProfileValidationRules,
} = require('../validators/authValidator');

const router = express.Router();

// Public routes
router.post('/register', registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

// Private routes (require a valid JWT)
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidationRules, validate, updateProfile);

// Admin-only route — demonstrates role-based access control
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;
