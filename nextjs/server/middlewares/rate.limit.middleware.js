const rateLimit = require("express-rate-limit");

const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 70,
  message: { message: "Too many authentication attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return (
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      req.connection?.remoteAddress ||
      'unknown'
    );
  },
  skip: () => false,
});

module.exports = RateLimit;
