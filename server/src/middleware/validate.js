/**
 * Express middleware factory that validates req.body against a Zod schema.
 * Returns 400 with field-level errors if validation fails.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }))
      return res.status(400).json({ error: 'Validation failed', errors })
    }
    req.body = result.data // use the parsed/coerced data
    next()
  }
}

module.exports = { validate }
