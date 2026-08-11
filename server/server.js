// server/server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const inquiriesRouter = require('./src/routes/inquiries')
const bookingsRouter  = require('./src/routes/bookings')
const calendarRouter  = require('./src/routes/calendar')
const { sanitizeBody } = require('./src/middleware/sanitize')

const app = express()

// ── Security middleware ───────────────────────────────────────────────────────
// Helmet sets secure HTTP headers: XSS protection, clickjacking, content sniffing, etc.
app.use(helmet())

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS: origin ${origin} not allowed`))
  },
  optionsSuccessStatus: 200,
}))
app.use(express.json({ limit: '10kb' })) // limit body size
app.use(sanitizeBody)                    // strip HTML/scripts + MongoDB $ operators

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/inquiries', inquiriesRouter)
app.use('/api/bookings',  bookingsRouter)
app.use('/api',           calendarRouter)

// Keep legacy /api/send-email working during transition (forwards to inquiry)
app.post('/api/send-email', (req, res) => {
  res.status(410).json({
    error: 'This endpoint is deprecated. Use POST /api/inquiries or POST /api/bookings.',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// ── Database ──────────────────────────────────────────────────────────────────
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✓ MongoDB connected')
      // Start iCal sync cron only after DB is ready
      const { startIcalCron } = require('./src/jobs/icalCron')
      startIcalCron()
    })
    .catch((err) => console.error('✗ MongoDB connection error:', err))
} else {
  console.warn('⚠ MONGO_URI not set — running without database')
}

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => console.log(`✓ Server running on port ${PORT}`))
