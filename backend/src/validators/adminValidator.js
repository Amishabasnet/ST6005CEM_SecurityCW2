const { query } = require('express-validator');

const statsValidationRules = [
  query('days')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('days must be an integer between 1 and 365'),
];

const recentOrdersValidationRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),
];

const lowStockValidationRules = [
  query('threshold')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('threshold must be a non-negative integer'),
];

const dashboardValidationRules = [
  query('days')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('days must be an integer between 1 and 365'),

  query('recentOrdersLimit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('recentOrdersLimit must be an integer between 1 and 100'),

  query('lowStockThreshold')
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage('lowStockThreshold must be a non-negative integer'),
];

module.exports = {
  statsValidationRules,
  recentOrdersValidationRules,
  lowStockValidationRules,
  dashboardValidationRules,
};
