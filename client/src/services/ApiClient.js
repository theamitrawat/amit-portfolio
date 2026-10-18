import axios from 'axios'

// In dev: Vite proxies /api/* → http://localhost:5000
// In prod: set VITE_API_URL to your deployed backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

/**
 * Normalizes any Axios error into { message, status }.
 * Raw error objects and stack traces are never surfaced to the UI.
 */
function normalizeError(err) {
  if (err.response) {
    const status = err.response.status
    if ([502, 503, 504].includes(status)) {
      throw {
        message: 'The contact service is temporarily unavailable. Please try again shortly.',
        status,
      }
    }

    const message =
      err.response.data?.message ||
      err.response.data?.error ||
      `Request failed with status ${status}`
    throw { message, status }
  }
  if (err.request) {
    throw { message: 'Network error. Please check your connection.', status: 0 }
  }
  throw { message: 'An unexpected error occurred.', status: 0 }
}

/** POST /api/contact */
export async function submitContactForm(data) {
  try {
    const res = await api.post('/api/contact', data)
    return res.data
  } catch (err) {
    normalizeError(err)
  }
}
