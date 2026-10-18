/**
 * Validates contact form data.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateContactForm(data) {
  const errors = {}

  // Name: required, max 100 chars
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required.'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.'
  }

  // Email: required, valid format, max 254 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required.'
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  } else if (data.email.trim().length > 254) {
    errors.email = 'Email must be 254 characters or fewer.'
  }

  // Subject: required, max 150 chars
  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = 'Subject is required.'
  } else if (data.subject.trim().length > 150) {
    errors.subject = 'Subject must be 150 characters or fewer.'
  }

  // Message: required, min 20, max 2000 chars
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
