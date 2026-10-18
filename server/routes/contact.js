import express from 'express'
import { validateContact } from '../middleware/validateContact.js'
import { sendContactNotification } from '../utils/mailer.js'

const router = express.Router()

router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    await sendContactNotification({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    })

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out! I'll get back to you within 24-48 hours.",
    })
  } catch (err) {
    console.error('[Contact] Error sending message:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
})

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default router
