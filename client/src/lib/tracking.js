import { useEffect, useRef } from 'react'
import API_BASE from './api.js'

/**
 * Lightweight first-party visitor tracking.
 *
 * Two event types, both notify the host by email via POST /api/events:
 *  - 'engagement'   — visitor interacted with the pricing widget for 5+ seconds
 *  - 'lead-capture' — visitor typed a valid email into an inquiry form,
 *                     captured even if they never hit send
 *
 * All sends are fire-and-forget (fetch keepalive) and deduped per session.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Session identity ──────────────────────────────────────────────────────────

export function getSessionId() {
  try {
    let sid = sessionStorage.getItem('ll_sid')
    if (!sid) {
      sid = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem('ll_sid', sid)
    }
    return sid
  } catch {
    return 'no-storage'
  }
}

function sessionInfo() {
  return {
    sessionId: getSessionId(),
    page:      window.location.pathname + window.location.search,
    referrer:  document.referrer || '',
    userAgent: navigator.userAgent || '',
    screen:    `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    viewport:  `${window.innerWidth}x${window.innerHeight}`,
    timezone:  Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    language:  navigator.language || '',
  }
}

// ── Transport ─────────────────────────────────────────────────────────────────

export function sendEvent(type, details = {}) {
  try {
    fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...sessionInfo(), details }),
      keepalive: true, // survives navigation / tab close
    }).catch(() => {})
  } catch {
    // tracking must never break the page
  }
}

// Marker helpers — once-per-session guards
function once(key) {
  try {
    if (sessionStorage.getItem(key)) return false
    sessionStorage.setItem(key, '1')
    return true
  } catch {
    return true
  }
}

// ── Engagement tracking (pricing widget) ──────────────────────────────────────

/**
 * React hook: reports when the visitor plays with a module for 5+ seconds.
 * Spread the returned handlers onto the module's wrapper element.
 *
 * @param {string} moduleName  e.g. 'pricing-card'
 * @param {() => object} getState  snapshot of module state to include in the report
 */
export function useModuleEngagement(moduleName, getState) {
  const getStateRef = useRef(getState)
  getStateRef.current = getState

  const startedAt     = useRef(null)
  const interactions  = useRef(0)
  const timerRef      = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const fire = () => {
    if (!once(`ll_engaged_${moduleName}`)) return
    let capturedEmail = ''
    try { capturedEmail = sessionStorage.getItem('ll_captured_email') || '' } catch { /* ignore */ }
    sendEvent('engagement', {
      module: moduleName,
      secondsEngaged: Math.round((Date.now() - startedAt.current) / 1000),
      interactions: interactions.current,
      email: capturedEmail,
      ...(getStateRef.current ? getStateRef.current() : {}),
    })
  }

  const record = () => {
    interactions.current += 1
    if (startedAt.current === null) {
      startedAt.current = Date.now()
      timerRef.current = setTimeout(fire, 5000)
    }
  }

  return {
    onPointerDownCapture: record,
    onFocusCapture: record,
    onChangeCapture: record,
  }
}

// ── Pre-submit email capture ──────────────────────────────────────────────────

let pendingCapture = null
let captureTimer = null

function flushPending() {
  clearTimeout(captureTimer)
  captureTimer = null
  if (!pendingCapture) return
  const { form, fields } = pendingCapture
  pendingCapture = null

  const email = (fields.email || '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return
  if (!once(`ll_lead_${email}`)) return // one notification per email per session

  try { sessionStorage.setItem('ll_captured_email', email) } catch { /* ignore */ }
  sendEvent('lead-capture', {
    form,
    email,
    name:  fields.name  || '',
    phone: fields.phone || '',
  })
}

// If the visitor leaves mid-typing, flush whatever is pending (keepalive send)
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flushPending)
}

/**
 * Call on every change to an email field. Debounces 1.5s after the last
 * keystroke, then captures if the value is a valid email address.
 */
export function trackEmailInput(form, fields) {
  pendingCapture = { form, fields }
  clearTimeout(captureTimer)
  captureTimer = setTimeout(flushPending, 1500)
}

/** Call on email field blur for an immediate capture attempt. */
export function flushEmailCapture(form, fields) {
  if (form && fields) pendingCapture = { form, fields }
  flushPending()
}
