import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { validateContactForm } from '../utils/validateContactForm'
import { submitContactForm } from '../services/ApiClient'
import Button from './Button'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

export default function ContactForm({ onSuccess }) {
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [errors,  setErrors]  = useState({})
  const [status,  setStatus]  = useState('idle')   // 'idle'|'loading'|'success'|'error'
  const [statusMsg, setStatusMsg] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name])  setErrors(prev => ({ ...prev, [name]: '' }))
    if (status !== 'idle') { setStatus('idle'); setStatusMsg('') }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { valid, errors: errs } = validateContactForm(form)
    if (!valid) { setErrors(errs); return }
    setStatus('loading')
    setErrors({})
    try {
      await submitContactForm(form)
      setStatus('success')
      setStatusMsg("Thanks for reaching out! I'll get back to you soon.")
      setForm(INITIAL_FORM)
      onSuccess?.()
    } catch (err) {
      setStatus('error')
      setStatusMsg(err?.message || 'Something went wrong. Please try again.')
    }
  }

  const loading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Status banner */}
      {(status === 'success' || status === 'error') && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl px-4 py-3.5 text-sm font-medium border ${
            status === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}
        >
          {status === 'success' ? '✅ ' : '❌ '}{statusMsg}
        </div>
      )}

      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="cf-name" className="block text-xs font-bold uppercase tracking-wider text-(--text-muted)">
            Full Name <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="cf-name" name="name" type="text"
            autoComplete="name" required maxLength={100}
            value={form.name} onChange={handleChange}
            placeholder="John Wick"
            disabled={loading}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && (
            <p id="cf-name-err" role="alert" className="text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="cf-email" className="block text-xs font-bold uppercase tracking-wider text-(--text-muted)">
            Email <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="cf-email" name="email" type="email"
            autoComplete="email" required maxLength={254}
            value={form.email} onChange={handleChange}
            placeholder="you@example.com"
            disabled={loading}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <p id="cf-email-err" role="alert" className="text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label htmlFor="cf-subject" className="block text-xs font-bold uppercase tracking-wider text-(--text-muted)">
          Subject <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="cf-subject" name="subject" type="text"
          required maxLength={150}
          value={form.subject} onChange={handleChange}
          placeholder="Job opportunity / Collaboration / Question"
          disabled={loading}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
          className={`form-input ${errors.subject ? 'error' : ''}`}
        />
        {errors.subject && (
          <p id="cf-subject-err" role="alert" className="text-xs text-red-400">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="cf-message" className="block text-xs font-bold uppercase tracking-wider text-(--text-muted)">
          Message <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <textarea
          id="cf-message" name="message"
          required rows={5} minLength={20} maxLength={2000}
          value={form.message} onChange={handleChange}
          placeholder="Tell me about the opportunity or project…"
          disabled={loading}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          className={`form-input resize-y min-h-[7.5rem] ${errors.message ? 'error' : ''}`}
        />
        <div className="flex justify-between items-start">
          {errors.message
            ? <p id="cf-message-err" role="alert" className="text-xs text-red-400">{errors.message}</p>
            : <span />
          }
          <span className="text-xs text-(--text-muted) ml-auto">{form.message.length}/2000</span>
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <span
              className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            <FiSend className="w-4 h-4" aria-hidden="true" /> Send Message
          </>
        )}
      </Button>
    </form>
  )
}
