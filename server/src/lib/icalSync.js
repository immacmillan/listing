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


/** Escape a string for safe use inside a RegExp. */
function escapeRegex(str) {
 return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}


/**
* Fetch and parse one iCal feed, upsert blocks into MongoDB, then prune any
* blocks from this feed that are no longer present in it.
*
* The feed is treated as the authoritative source. Pruning matters because
* platforms regenerate UIDs rather than editing events in place — Airbnb's
* rolling "booking window" block, for example, gets a fresh UID each time the
* window advances. Without a prune, every superseded event is orphaned in the
* database forever and keeps blocking dates that are actually available.
*
* Pruning only runs after a successful fetch + parse, so a network error or a
* failed request can never wipe out real availability data.
*/
async function syncFeed({ source, label, url }) {
 console.log(`[ical] Syncing ${label}...`)
 try {
   // Resolve any HTTP→HTTPS redirects before parsing
   const resolvedUrl = await resolveRedirects(url)
   const events = await ical.async.fromURL(resolvedUrl)
   const seenUids = []
   let upserted = 0


   for (const key of Object.keys(events)) {
     const event = events[key]
     if (event.type !== 'VEVENT') continue
     if (!event.start || !event.end) continue


     // Prefix UID with label to avoid collisions across listings
     const uid = `${label}::${event.uid || key}`
     seenUids.push(uid)


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


   // Remove blocks that this feed no longer reports. Scoped to this feed's
   // UID prefix so other listings/platforms are never touched.
   const { deletedCount } = await AvailabilityBlock.deleteMany({
     uid: { $regex: `^${escapeRegex(`${label}::`)}`, $nin: seenUids },
   })


   console.log(`[ical] ${label}: ${upserted} blocks synced, ${deletedCount} stale removed`)
   return { upserted, deleted: deletedCount }
 } catch (err) {
   console.error(`[ical] Failed to sync ${label}: ${err.message} — skipping prune to preserve existing blocks`)
   return { upserted: 0, deleted: 0 }
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
