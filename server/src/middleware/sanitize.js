const sanitizeHtml = require('sanitize-html')

/**
 * Recursively strip HTML tags and script content from all string values
 * in req.body before they reach route handlers or the database.
 */
function sanitizeValue(value) {
  if (typeof value === 'string') {
    return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }
  if (value && typeof value === 'object') {
    return sanitizeObject(value)
  }
  return value
}

function sanitizeObject(obj) {
  const clean = {}
  for (const key of Object.keys(obj)) {
    // Strip MongoDB operator injection — keys starting with $ are dangerous
    if (key.startsWith('$')) continue
    clean[key] = sanitizeValue(obj[key])
  }
  return clean
}

function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body)
  }
  next()
}

module.exports = { sanitizeBody }
