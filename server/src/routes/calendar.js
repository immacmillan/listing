const express = require('express')
const AvailabilityBlock = require('../models/AvailabilityBlock')
const Booking = require('../models/Booking')
const { generateListingCalendar } = require('../lib/icalExport')
const { syncAllFeeds } = require('../lib/icalSync')
const { syncLimiter } = require('../middleware/rateLimiter')


const router = express.Router()


/**
* GET /api/availability
* Returns all blocked date ranges merged from:
*   - iCal imports (Airbnb, Vrbo, Booking.com)
*   - Direct bookings (pending + confirmed)
*
* Query params:
*   from  YYYY-MM-DD  (default: today)
*   to    YYYY-MM-DD  (default: 12 months from today)
*
* Response: { blockedRanges: [{ start, end, source }] }
*/
router.get('/availability', async (req, res) => {
 try {
   const from = req.query.from ? new Date(req.query.from) : new Date()
   const to   = req.query.to
     ? new Date(req.query.to)
     : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)


   // iCal blocks
   const icalBlocks = await AvailabilityBlock.find({
     startDate: { $lte: to },
     endDate:   { $gte: from },
   }).lean()


   // Direct bookings
   const directBookings = await Booking.find({
     status:   { $in: ['pending', 'confirmed'] },
     checkIn:  { $lte: to },
     checkOut: { $gte: from },
   }).lean()


   const blockedRanges = [
     ...icalBlocks.map((b) => ({
       start:  b.startDate,
       end:    b.endDate,
       source: b.source,
     })),
     ...directBookings.map((b) => ({
       start:  b.checkIn,
       end:    b.checkOut,
       source: 'direct',
     })),
   ]


   res.json({ blockedRanges })
 } catch (err) {
   console.error('Availability error:', err)
   res.status(500).json({ error: 'Failed to fetch availability' })
 }
})


/**
* GET /api/calendar/listing.ics
* Outbound iCal feed — paste this URL into Airbnb/Vrbo "Import calendar"
* to block direct bookings on those platforms automatically.
*/
router.get('/calendar/listing.ics', async (req, res) => {
 try {
   const icsContent = await generateListingCalendar()
   res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
   res.setHeader('Content-Disposition', 'attachment; filename="listing.ics"')
   res.setHeader('Cache-Control', 'no-cache, no-store')
   res.send(icsContent)
 } catch (err) {
   console.error('iCal export error:', err)
   res.status(500).json({ error: 'Failed to generate calendar' })
 }
})


/**
* POST /api/calendar/sync
* Manually trigger an iCal sync (useful for testing before cron is running).
* In production this is called automatically by the cron job.
*/
router.post('/calendar/sync', syncLimiter, async (req, res) => {
 try {
   await syncAllFeeds()
   res.json({ message: 'Sync complete' })
 } catch (err) {
   console.error('Manual sync error:', err)
   res.status(500).json({ error: 'Sync failed' })
 }
})


module.exports = router
