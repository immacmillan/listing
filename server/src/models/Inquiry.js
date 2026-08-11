const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 200 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
    phone:   { type: String, trim: true, maxlength: 30, default: '' },
    reason:  {
      type: String,
      enum: ['Short-term Rental', 'Mid-term Rental', 'Long-term Rental', 'Corporate/Private Event', 'Film & Media Production', 'Other', 'Inquiry'],
      required: true,
    },
    message: { type: String, required: true, maxlength: 2500 },
    status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    ipAddress: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Inquiry', inquirySchema)
