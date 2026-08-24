const rateLimit = require('express-rate-limit')


// Limit form submissions: 10 requests per 15 minutes per IP
const formLimiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 10,
 standardHeaders: true,
 legacyHeaders: false,
 message: { error: 'Too many requests, please try again later.' },
})


// Limit tracking events: 30 requests per 15 minutes per IP.
// Separate instance so event pings never consume the form submission budget.
const eventLimiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 30,
 standardHeaders: true,
 legacyHeaders: false,
 message: { error: 'Too many requests, please try again later.' },
})


// Limit manual iCal sync triggers: 5 per hour per IP.
// The endpoint is unauthenticated and fans out to six external feeds plus
// database writes, so it needs a tighter budget than ordinary form posts.
const syncLimiter = rateLimit({
 windowMs: 60 * 60 * 1000,
 max: 5,
 standardHeaders: true,
 legacyHeaders: false,
 message: { error: 'Too many sync requests, please try again later.' },
})


module.exports = { formLimiter, eventLimiter, syncLimiter }
