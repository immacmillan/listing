const express = require('express')
const { z } = require('zod')
const Inquiry = require('../models/Inquiry')
const { sendNotification, sendConfirmation } = require('../lib/email')
const { validate } = require('../middleware/validate')
const { formLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

const inquirySchema = z.object({
  name:    z.string().min(1, 'Name is required').max(200).trim(),
  email:   z.string().email('Invalid email address').max(320).trim().toLowerCase(),
  phone:   z.string().max(30).trim().optional().default(''),
  reason:  z.enum(
    ['Short-term Rental', 'Mid-term Rental', 'Long-term Rental', 'Corporate/Private Event', 'Other', 'Inquiry'],
    { errorMap: () => ({ message: 'Please select a valid inquiry type' }) }
  ),
  message: z.string().min(1, 'Message is required').max(2500),
})

// POST /api/inquiries
router.post('/', formLimiter, validate(inquirySchema), async (req, res) => {
  try {
    const { name, email, phone, reason, message } = req.body

    // Persist to MongoDB
    const inquiry = await Inquiry.create({
      name, email, phone, reason, message,
      ipAddress: req.ip,
    })

    // Notify host — non-fatal, DB write already succeeded
    try {
      await sendNotification({
        subject: `New Inquiry: ${reason} — ${name}`,
        replyTo: email,
        text: [
          `New inquiry received on Denver Dream House`,
          ``,
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Phone:   ${phone || 'Not provided'}`,
          `Type:    ${reason}`,
          ``,
          `Message:`,
          message,
          ``,
          `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })} MT`,
          `ID: ${inquiry._id}`,
        ].join('\n'),
      })
    } catch (emailErr) {
      console.error('Host notification failed (inquiry saved):', emailErr.message)
    }

    // Confirm to guest — non-fatal
    try {
      await sendConfirmation({
        to: email,
        subject: 'We received your inquiry — Denver Dream House',
        text: [
          `Hi ${name},`,
          ``,
          `Thanks for reaching out about Denver Dream House at 5236 Malta Street, Denver CO.`,
          `We've received your inquiry and will get back to you within 24 hours.`,
          ``,
          `Your inquiry details:`,
          `Type: ${reason}`,
          `Message: ${message}`,
          ``,
          `— Luxe Listings`,
        ].join('\n'),
      })
    } catch (emailErr) {
      console.error('Guest confirmation failed (inquiry saved):', emailErr.message)
    }

    res.status(201).json({
      message: 'Inquiry received',
      id: inquiry._id,
    })
  } catch (err) {
    console.error('Inquiry error:', err)
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again.' })
  }
})

module.exports = router
