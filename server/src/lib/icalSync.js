const ical = require('node-ical')
const https = require('https')
const http = require('http')
const AvailabilityBlock = require('../models/AvailabilityBlock')

/**
 * Fetch a URL following HTTP→HTTPS redirects.
 * node-ical's fromURL doesn't always follow cross-protocol redirects,
 * so we resolve the final URL first then pass it to node-ical.
 */
function resolveRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const req = protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects === 0) return reject(new Error('Too many redirects'))
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString()
        resolve(resolveRedirects(next, maxRedirects - 1))
      } else {
        resolve(url)
      }
      res.destroy()
    })
    req.on('error', reject)
  })
}

/**
 * Configured iCal feed URLs — supports multiple listings per platform.
 * Add your iCal export URLs to server/.env
 */
const FEEDS = [
  { source: 'airbnb',      label: 'Airbnb 7br',      url: process.env.ICAL_AIRBNB_7BR_URL },
  { source: 'airbnb',      label: 'Airbnb 6br',      url: process.env.ICAL_AIRBNB_6BR_URL },
  { source: 'vrbo',        label: 'Vrbo 7br',         url: process.env.ICAL_VRBO_7BR_URL },
  { source: 'vrbo',        label: 'Vrbo 6br',         url: process.env.ICAL_VRBO_6BR_URL },
  { source: 'booking.com', label: 'Booking.com 7br',  url: process.env.ICAL_BOOKING_7BR_URL },
  { source: 'booking.com', label: 'Booking.com 6br',  url: process.env.ICAL_BOOKING_6BR_URL },
].filter((f) => f.url) // only sync feeds that have a URL configured

/**
 * Fetch and parse one iCal feed, upsert blocks into MongoDB.
 * Uses the iCal UID as the unique key so re-syncs are idempotent.
 */
async function syncFeed({ source, label, url }) {
  console.log(`[ical] Syncing ${label}...`)
  try {
    // Resolve any HTTP→HTTPS redirects before parsing
    const resolvedUrl = await resolveRedirects(url)
    const events = await ical.async.fromURL(resolvedUrl)
    let upserted = 0

    for (const key of Object.keys(events)) {
      const event = events[key]
      if (event.type !== 'VEVENT') continue
      if (!event.start || !event.end) continue

      // Prefix UID with label to avoid collisions across listings
      const uid = `${label}::${event.uid || key}`

      await AvailabilityBlock.findOneAndUpdate(
        { uid },
        {
          source,
          uid,
          summary:   event.summary || 'Blocked',
          startDate: new Date(event.start),
          endDate:   new Date(event.end),
        },
        { upsert: true, new: true }
      )
      upserted++
    }

    console.log(`[ical] ${label}: ${upserted} blocks synced`)
    return upserted
  } catch (err) {
    console.error(`[ical] Failed to sync ${label}:`, err.message)
    return 0
  }
}

/**
 * Sync all configured feeds.
 */
async function syncAllFeeds() {
  if (FEEDS.length === 0) {
    console.log('[ical] No iCal feeds configured — skipping sync')
    return
  }
  await Promise.allSettled(FEEDS.map(syncFeed))
}

module.exports = { syncAllFeeds, syncFeed, FEEDS }
