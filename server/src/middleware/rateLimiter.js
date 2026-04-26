const rateLimit = require('express-rate-limit')

// Limit form submissions: 10 requests per 15 minutes per IP
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})

module.exports = { formLimiter }
