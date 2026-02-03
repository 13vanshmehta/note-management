const rateLimit = require("express-rate-limit");

const createNoteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    message: "Only max 5 note creations are allowed per minute",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = createNoteLimiter;
