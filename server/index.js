import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000
// Elastic Beanstalk's load balancer and instance Nginx add two proxy hops.
app.set('trust proxy', 2)

const ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://localhost:4173',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean),
])

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.has(origin)) return cb(null, true)
    cb(new Error(`CORS: Origin ${origin} not allowed`))
  },
  methods: ['GET', 'POST'],
  credentials: true,
}))
app.use(helmet())
app.use(express.json({ limit: '10kb', strict: false }))
app.use(express.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.json({
    name: 'Amit Portfolio API',
    version: '1.0.0',
    status: 'running',
  })
})

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact attempts. Please try again later.',
  },
})

app.use('/api/contact', contactLimiter, contactRouter)

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message)
  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600
    ? err.status
    : 500
  res.status(status).json({
    success: false,
    message: status >= 500 ? 'Internal server error' : 'Invalid request.',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
