const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, maxlength: 200 },
    email:       { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    phone:       { type: String, trim: true, maxlength: 30, default: '' },
    bookingType: {
      type: String,
      enum: ['Daily Rental', 'Weekly Rental', 'Monthly Rental', 'Event'],
      required: true,
    },
    checkIn:     { type: Date, required: true },
    checkOut:    { type: Date, required: true },
    guests:      { type: Number, min: 1, max: 50, default: 1 },
    message:     { type: String, maxlength: 2500, default: '' },
    status:      {
      type: String,
      enum: ['pending', 'confirmed', 'declined', 'cancelled'],
      default: 'pending',
    },
    ipAddress: { type: String },
  },
  { timestamps: true }
)

// Ensure check-out is after check-in
bookingSchema.pre('validate', function (next) {
  if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
    this.invalidate('checkOut', 'Check-out must be after check-in')
  }
  next()
})

module.exports = mongoose.model('Booking', bookingSchema)
