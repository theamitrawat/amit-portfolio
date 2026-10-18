/**
 * Truncates a string to `max` characters, appending ellipsis at a word boundary.
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max) {
  if (!str || str.length <= max) return str || ''
  const sliced = str.slice(0, max)
  const lastSpace = sliced.lastIndexOf(' ')
  return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced) + '…'
}
