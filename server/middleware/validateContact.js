/**
 * Express middleware — validates contact form request body before
 * hitting the database or sending emails.
 * Returns 400 with field-level errors on failure.
 */
export function validateContact(req, res, next) {
  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const { name, email, subject, message } = body
  const errors = {}
  const isText = (value) => typeof value === 'string'

  // Name
  if (!isText(name) || name.trim().length === 0) {
    errors.name = 'Name is required.'
  } else if (name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.'
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!isText(email) || email.trim().length === 0) {
    errors.email = 'Email is required.'
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  } else if (email.trim().length > 254) {
    errors.email = 'Email must be 254 characters or fewer.'
  }

  // Subject
  if (!isText(subject) || subject.trim().length === 0) {
    errors.subject = 'Subject is required.'
  } else if (subject.trim().length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.'
  }

  // Message
  if (!isText(message) || message.trim().length === 0) {
    errors.message = 'Message is required.'
  } else if (message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  } else if (message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors })
  }

  next()
}
