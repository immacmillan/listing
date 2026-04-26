const { Resend } = require('resend')

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Luxe Listings <onboarding@resend.dev>'
const TO_ADDRESS   = process.env.EMAIL_TO

// Lazy — only instantiated when a send is attempted, so missing key doesn't crash startup
function getClient() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

/**
 * Send a plain-text notification email to the host.
 */
async function sendNotification({ subject, text, replyTo }) {
  const resend = getClient()
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping host notification email')
    return null
  }

  const { data, error } = await resend.emails.send({
    from:    FROM_ADDRESS,
    to:      [TO_ADDRESS],
    replyTo: replyTo || undefined,
    subject,
    text,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error('Failed to send email notification')
  }

  return data
}

/**
 * Send a confirmation email to the guest.
 */
async function sendConfirmation({ to, subject, text }) {
  const resend = getClient()
  if (!resend) {
    console.warn('RESEND_API_KEY not set — skipping guest confirmation email')
    return null
  }

  const { data, error } = await resend.emails.send({
    from:    FROM_ADDRESS,
    to:      [to],
    subject,
    text,
  })

  if (error) {
    // Non-fatal — log but don't throw
    console.error('Resend confirmation error:', error)
  }

  return data
}

module.exports = { sendNotification, sendConfirmation }
