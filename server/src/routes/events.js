const express = require('express')
const { z } = require('zod')
const mongoose = require('mongoose')
const Event = require('../models/Event')
const { sendNotification } = require('../lib/email')
const { validate } = require('../middleware/validate')
const { eventLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

const detailValue = z.union([z.string().max(500), z.number(), z.boolean(), z.null()])

const eventSchema = z.object({
  type:      z.enum(['engagement', 'lead-capture']),
  sessionId: z.string().min(4).max(64).trim(),
  page:      z.string().max(500).trim().optional().default(''),
  referrer:  z.string().max(500).trim().optional().default(''),
  userAgent: z.string().max(500).trim().optional().default(''),
  screen:    z.string().max(20).trim().optional().default(''),
  viewport:  z.string().max(20).trim().optional().default(''),
  timezone:  z.string().max(64).trim().optional().default(''),
  language:  z.string().max(16).trim().optional().default(''),
  details:   z.record(z.string().max(64), detailValue).optional().default({}),
})

function sessionLines(body, req) {
  return [
    `Session:  ${body.sessionId}`,
    `Page:     ${body.page || 'unknown'}`,
    `Referrer: ${body.referrer || 'direct'}`,
    `Device:   ${body.userAgent || 'unknown'}`,
    `Screen:   ${body.screen || '?'} (viewport ${body.viewport || '?'})`,
    `Locale:   ${body.timezone || '?'} · ${body.language || '?'}`,
    `IP:       ${req.ip}`,
    `Time:     ${new Date().toLocaleString('en-US', { timeZone: 'America/Denver' })} MT`,
  ]
}

function buildNotification(body, req) {
  const d = body.details || {}

  if (body.type === 'lead-capture') {
    return {
      subject: `Lead (pre-submit): ${d.email || 'unknown'} — ${d.form || 'form'}`,
      replyTo: d.email || undefined,
      text: [
        `A visitor typed their email into the ${d.form || 'inquiry'} form but hasn't hit send (yet).`,
        ``,
        `Email:  ${d.email || 'unknown'}`,
        `Name:   ${d.name || 'not typed yet'}`,
        `Phone:  ${d.phone || 'not typed yet'}`,
        ``,
        ...sessionLines(body, req),
      ].join('\n'),
    }
  }

  // engagement
  const dates = d.checkIn || d.checkOut
    ? `${d.checkIn || '?'} → ${d.checkOut || '?'}`
    : 'none selected'
  return {
    subject: `Live: visitor exploring pricing${d.email ? ` — ${d.email}` : ''}`,
    replyTo: d.email || undefined,
    text: [
      `A visitor has been interacting with the "${d.module || 'pricing'}" widget for ${d.secondsEngaged || 5}+ seconds.`,
      ``,
      `Interactions: ${d.interactions || '?'}`,
      `Dates:        ${dates}`,
      `Guests:       ${d.guests || '?'}`,
      `Email:        ${d.email || 'not captured'}`,
      ``,
      ...sessionLines(body, req),
    ].join('\n'),
  }
}

// POST /api/events — fire-and-forget tracking beacon from the client
router.post('/', eventLimiter, validate(eventSchema), async (req, res) => {
  // Respond immediately — the client may be navigating away (keepalive send)
  res.status(202).json({ ok: true })

  const body = req.body

  // Persist — best-effort
  if (mongoose.connection.readyState === 1) {
    try {
      await Event.create({ ...body, ipAddress: req.ip })
    } catch (err) {
      console.error('Event persist failed:', err.message)
    }
  }

  // Notify host — best-effort
  try {
    await sendNotification(buildNotification(body, req))
  } catch (err) {
    console.error('Event notification failed:', err.message)
  }
})

module.exports = router
