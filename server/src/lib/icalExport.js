const ical = require('ical-generator')
const Booking = require('../models/Booking')

/**
 * Generate an iCal feed of all confirmed/pending direct bookings.
 * Airbnb and Vrbo can import this URL to block those dates on their calendars.
 *
 * Export URL: GET /api/calendar/listing.ics
 */
async function generateListingCalendar() {
  const calendar = ical.default({
    name: 'Denver Dream House — 5236 Malta St',
    description: 'Availability calendar for 5236 Malta Street, Denver CO 80249',
    timezone: 'America/Denver',
    prodId: { company: 'Luxe Listings', product: 'Denver Dream House' },
  })

  // Include pending + confirmed bookings (not declined/cancelled)
  const bookings = await Booking.find({
    status: { $in: ['pending', 'confirmed'] },
  }).lean()

  for (const booking of bookings) {
    calendar.createEvent({
      id:      booking._id.toString(),
      start:   booking.checkIn,
      end:     booking.checkOut,
      summary: 'Reserved',          // generic — don't expose guest names
      description: booking.bookingType,
      allDay:  true,
    })
  }

  return calendar.toString()
}

module.exports = { generateListingCalendar }
