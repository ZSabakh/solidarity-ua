const rateLimit = require("express-rate-limit");

const RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 70,
  message: { message: "Too many authentication attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = RateLimit;
