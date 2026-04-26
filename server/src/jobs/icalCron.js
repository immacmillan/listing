const cron = require('node-cron')
const { syncAllFeeds } = require('../lib/icalSync')

/**
 * Schedule iCal sync to run every hour.
 * Airbnb updates their iCal feeds roughly every 2-3 hours,
 * so hourly polling is more than sufficient.
 */
function startIcalCron() {
  // Run once immediately on startup
  syncAllFeeds()

  // Then every hour at :00
  cron.schedule('0 * * * *', () => {
    console.log('[cron] Running scheduled iCal sync...')
    syncAllFeeds()
  })

  console.log('✓ iCal sync cron scheduled (hourly)')
}

module.exports = { startIcalCron }
