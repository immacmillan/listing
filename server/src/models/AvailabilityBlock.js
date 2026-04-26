const mongoose = require('mongoose')

const availabilityBlockSchema = new mongoose.Schema(
  {
    // Where this block came from
    source: {
      type: String,
      enum: ['airbnb', 'vrbo', 'booking.com', 'direct', 'manual'],
      required: true,
    },
    // The iCal UID — used to deduplicate on re-sync
    uid: { type: String, required: true, unique: true },
    summary: { type: String, default: 'Blocked' },
    startDate: { type: Date, required: true },
    endDate:   { type: Date, required: true },
  },
  { timestamps: true }
)

// Index for fast date range queries
availabilityBlockSchema.index({ startDate: 1, endDate: 1 })

module.exports = mongoose.model('AvailabilityBlock', availabilityBlockSchema)
