const express = require('express');
const {
  getMyNotifications,
  markAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const { notificationIdParamValidationRules } = require('../validators/notificationValidator');

const router = express.Router();

router.use(protect);

router.get('/', getMyNotifications);
router.put('/:id/read', notificationIdParamValidationRules, validate, markAsRead);
router.delete('/:id', notificationIdParamValidationRules, validate, deleteNotification);

module.exports = router;
