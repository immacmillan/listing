const express = require('express')
const { z } = require('zod')
const Booking = require('../models/Booking')
const { sendNotification, sendConfirmation } = require('../lib/email')
const { validate } = require('../middleware/validate')
const { formLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

const bookingSchema = z.object({
  name:        z.string().min(1, 'Name is required').max(200).trim(),
  email:       z.string().email('Invalid email address').max(320).trim().toLowerCase(),
  phone:       z.string().max(30).trim().optional().default(''),
  bookingType: z.enum(
    ['Daily Rental', 'Weekly Rental', 'Monthly Rental', 'Event'],
    { errorMap: () => ({ message: 'Please select a booking type' }) }
  ),
  checkIn:  z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests:   z.coerce.number().int().min(1).max(50).default(1),
  message:  z.string().max(2500).optional().default(''),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  { message: 'Check-out must be after check-in', path: ['checkOut'] }
)

// POST /api/bookings
router.post('/', formLimiter, validate(bookingSchema), async (req, res) => {
  try {
    const { name, email, phone, bookingType, checkIn, checkOut, guests, message } = req.body

    const booking = await Booking.create({
      name, email, phone, bookingType,
      checkIn:  new Date(checkIn),
      checkOut: new Date(checkOut),
      guests, message,
      ipAddress: req.ip,
    })

    const dateRange = `${new Date(checkIn).toLocaleDateString('en-US')} → ${new Date(checkOut).toLocaleDateString('en-US')}`

    // Notify host — non-fatal
    try {
      await sendNotification({
        subject: `New Booking Request: ${bookingType} — ${name}`,
        replyTo: email,
        text: [
          `New booking request for Denver Dream House`,
          ``,
          `Name:         ${name}`,
          `Email:        ${email}`,
          `Phone:        ${phone || 'Not provided'}`,
          `Type:         ${bookingType}`,
          `Dates:        ${dateRange}`,
          `Guests:       ${guests}`,
          ``,
          `Message:`,
          message || '(none)',
          ``,
          `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })} MT`,
          `ID: ${booking._id}`,
        ].join('\n'),
      })
    } catch (emailErr) {
      console.error('Host notification failed (booking saved):', emailErr.message)
    }

    // Confirm to guest — non-fatal
    try {
      await sendConfirmation({
        to: email,
        subject: 'Booking request received — Denver Dream House',
        text: [
          `Hi ${name},`,
          ``,
          `We've received your booking request for Denver Dream House at 5236 Malta Street, Denver CO.`,
          ``,
          `Your request details:`,
          `Type:    ${bookingType}`,
          `Dates:   ${dateRange}`,
          `Guests:  ${guests}`,
          ``,
          `We'll review your request and get back to you within 24 hours to confirm availability and pricing.`,
          ``,
          `— Luxe Listings`,
        ].join('\n'),
      })
    } catch (emailErr) {
      console.error('Guest confirmation failed (booking saved):', emailErr.message)
    }

    res.status(201).json({
      message: 'Booking request received',
      id: booking._id,
    })
  } catch (err) {
    console.error('Booking error:', err)
    res.status(500).json({ error: 'Failed to submit booking request. Please try again.' })
  }
})

module.exports = router
