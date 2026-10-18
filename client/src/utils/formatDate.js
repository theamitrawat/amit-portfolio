/**
 * Normalizes a date string to "MMM YYYY" format.
 * Handles: "Jan 2024", "January 2024", "2024-01", "2024-01-15", raw Date
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return ''

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]

  // Already in "MMM YYYY" format
  if (typeof dateInput === 'string' && /^[A-Za-z]{3}\s\d{4}$/.test(dateInput.trim())) {
    return dateInput.trim()
  }

  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return String(dateInput)

  return `${months[date.getMonth()]} ${date.getFullYear()}`
}
