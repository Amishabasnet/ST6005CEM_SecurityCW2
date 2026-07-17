const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const asyncHandler = require('../utils/asyncHandler');

const DEFAULT_LOW_STOCK_THRESHOLD = 10;
const DEFAULT_RECENT_ORDERS_LIMIT = 10;
const DEFAULT_SALES_SUMMARY_DAYS = 7;

const clampInt = (value, { min, max, fallback }) => {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
};

const getTotalRevenue = async () => {
  const result = await Order.aggregate([
    { $match: { paymentStatus: 'Paid' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  return result[0]?.total || 0;
};

const getOrderStatusBreakdown = async () => {
  const results = await Order.aggregate([{ $group: { _id: '$orderStatus', count: { $sum: 1 } } }]);

  const breakdown = { Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
  results.forEach((r) => {
    if (r._id in breakdown) breakdown[r._id] = r.count;
  });
  return breakdown;
};

const getSalesSummary = async (days) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const results = await Order.aggregate([
    { $match: { paymentStatus: 'Paid', createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, date: '$_id', totalSales: 1, orderCount: 1 } },
  ]);

  return results;
};

const getStats = asyncHandler(async (req, res) => {
  const days = clampInt(req.query.days, { min: 1, max: 365, fallback: DEFAULT_SALES_SUMMARY_DAYS });

  const [totalUsers, totalProducts, totalOrders, totalRevenue, orderStatusBreakdown, salesSummary] =
    await Promise.all([
      User.countDocuments({}),
      Product.countDocuments({}),
      Order.countDocuments({}),
      getTotalRevenue(),
      getOrderStatusBreakdown(),
      getSalesSummary(days),
    ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      orderStatusBreakdown,
      salesSummary,
    },
  });
});

const getRecentOrders = asyncHandler(async (req, res) => {
  const limit = clampInt(req.query.limit, {
    min: 1,
    max: 100,
    fallback: DEFAULT_RECENT_ORDERS_LIMIT,
  });

  const orders = await Order.find({}).populate('user', 'name email').sort('-createdAt').limit(limit);

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

const getLowStockProducts = asyncHandler(async (req, res) => {
  const threshold = clampInt(req.query.threshold, {
    min: 0,
    max: 10000,
    fallback: DEFAULT_LOW_STOCK_THRESHOLD,
  });

  const products = await Product.find({ isActive: true, stock: { $lte: threshold } })
    .select('name stock price category brand images')
    .sort('stock');

  res.status(200).json({ success: true, count: products.length, threshold, data: products });
});

const getDashboard = asyncHandler(async (req, res) => {
  const days = clampInt(req.query.days, { min: 1, max: 365, fallback: DEFAULT_SALES_SUMMARY_DAYS });
  const recentOrdersLimit = clampInt(req.query.recentOrdersLimit, {
    min: 1,
    max: 100,
    fallback: DEFAULT_RECENT_ORDERS_LIMIT,
  });
  const lowStockThreshold = clampInt(req.query.lowStockThreshold, {
    min: 0,
    max: 10000,
    fallback: DEFAULT_LOW_STOCK_THRESHOLD,
  });

  const [
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue,
    orderStatusBreakdown,
    salesSummary,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    User.countDocuments({}),
    Product.countDocuments({}),
    Order.countDocuments({}),
    getTotalRevenue(),
    getOrderStatusBreakdown(),
    getSalesSummary(days),
    Order.find({}).populate('user', 'name email').sort('-createdAt').limit(recentOrdersLimit),
    Product.find({ isActive: true, stock: { $lte: lowStockThreshold } })
      .select('name stock price category brand')
      .sort('stock'),
  ]);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        orderStatusBreakdown,
        salesSummary,
      },
      recentOrders,
      lowStockProducts,
    },
  });
});

module.exports = {
  getStats,
  getRecentOrders,
  getLowStockProducts,
  getDashboard,
};
