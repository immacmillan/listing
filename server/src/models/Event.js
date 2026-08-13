const mongoose = require('mongoose')

/**
 * Visitor tracking event.
 *  - engagement:   visitor interacted with a widget (e.g. pricing card) for 5+ seconds
 *  - lead-capture: visitor typed a valid email into a form without submitting
 */
const eventSchema = new mongoose.Schema(
  {
    type:      { type: String, enum: ['engagement', 'lead-capture'], required: true },
    sessionId: { type: String, required: true, trim: true, maxlength: 64 },
    page:      { type: String, trim: true, maxlength: 500, default: '' },
    referrer:  { type: String, trim: true, maxlength: 500, default: '' },
    userAgent: { type: String, trim: true, maxlength: 500, default: '' },
    screen:    { type: String, trim: true, maxlength: 20,  default: '' },
    viewport:  { type: String, trim: true, maxlength: 20,  default: '' },
    timezone:  { type: String, trim: true, maxlength: 64,  default: '' },
    language:  { type: String, trim: true, maxlength: 16,  default: '' },
    details:   { type: mongoose.Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true }
)

eventSchema.index({ sessionId: 1, createdAt: -1 })

module.exports = mongoose.model('Event', eventSchema)
