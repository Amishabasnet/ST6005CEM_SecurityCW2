const rateLimit = require('express-rate-limit');
const ApiError = require('../utils/ApiError');
const parseIpList = (envVar) =>
  (process.env[envVar] || '')
    .split(',')
    .map((ip) => ip.trim())
    .filter(Boolean);

const ipAccessControl = (req, res, next) => {
  const ip = req.ip;
  const blockedIps = parseIpList('BLOCKED_IPS');
  const allowedIps = parseIpList('ALLOWED_IPS');

  if (blockedIps.includes(ip)) {
    throw new ApiError(403, 'Access denied from this IP address');
  }

  req.isAllowlistedIp = allowedIps.includes(ip);
  next();
};

const skipAllowlisted = (req) => req.isAllowlistedIp === true;

const rateLimitHandler = (message) => (req, res) => {
  res.status(429).json({ success: false, message });
};

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_GLOBAL_MAX) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipAllowlisted,
  handler: rateLimitHandler('Too many requests from this IP. Please try again later.'),
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_AUTH_MAX) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipAllowlisted,
  handler: rateLimitHandler('Too many attempts. Please try again in 15 minutes.'),
});
const sensitiveActionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_SENSITIVE_MAX) || 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipAllowlisted,
  handler: rateLimitHandler('Too many requests to this endpoint. Please slow down and try again later.'),
});

module.exports = {
  ipAccessControl,
  globalLimiter,
  authLimiter,
  sensitiveActionLimiter,
};
