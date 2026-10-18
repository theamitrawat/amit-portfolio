import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiMail } from 'react-icons/fi'
import Loader from '../components/Loader'
import Button from '../components/Button'

const RESUME_PDF    = '/Amit_Resume_Python_developer.pdf'
const CONTACT_EMAIL = 'theamitrwt@gmail.com'

export default function Resume() {
  const [pdfStatus, setPdfStatus] = useState('loading') // 'loading' | 'loaded' | 'error'

  useEffect(() => {
    let cancelled = false
    fetch(RESUME_PDF, { method: 'HEAD' })
      .then(res => { if (!res.ok) throw new Error(); if (!cancelled) setPdfStatus('loaded') })
      .catch(() => { if (!cancelled) setPdfStatus('error') })
    return () => { cancelled = true }
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden page-header-band dot-grid"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-blob-blue   w-[400px] h-[400px] -top-20 -right-10 opacity-40" />
          <div className="glow-blob glow-blob-purple w-[350px] h-[350px] bottom-0 left-0 opacity-30"  />
        </div>
        <div className="relative content-shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 tag-pill-accent text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-(--border-hover) mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--accent-blue)" aria-hidden="true" />
              Resume
            </span>
            <h1 className="text-hero font-bold text-(--text-primary) mb-4">
              My <span className="gradient-text">Resume</span>
            </h1>
            <p className="text-base text-(--text-secondary) max-w-md mx-auto mb-8">
              Download or view my latest resume — updated with recent projects and skills.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                href={RESUME_PDF}
                download="Amit_Rawat_Resume.pdf"
                variant="primary"
                disabled={pdfStatus === 'error'}
              >
                <FiDownload className="w-4 h-4" aria-hidden="true" /> Download PDF
              </Button>
              <Button to="/contact" variant="secondary">
                <FiMail className="w-4 h-4" aria-hidden="true" /> Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── PDF viewer ── */}
      <div className="content-shell-narrow page-content-area">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--bg-card) min-h-[80vh] shadow-[var(--shadow-lg)]"
        >
          {/* loading state */}
          {pdfStatus === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-(--bg-card)">
              <Loader />
            </div>
          )}

          {/* error state */}
          {pdfStatus === 'error' && (
            <div
              className="flex flex-col items-center justify-center gap-5 py-28 px-6 text-center"
              role="alert"
            >
              <div className="text-5xl" aria-hidden="true">📄</div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-(--text-primary)">Resume Unavailable</p>
                <p className="text-sm text-(--text-secondary)">
                  The PDF couldn't be loaded right now.
                </p>
                <p className="text-sm text-(--text-muted)">
                  Request it directly at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-(--accent-blue) hover:underline font-semibold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button to="/contact" variant="primary">
                  <FiMail className="w-4 h-4" aria-hidden="true" /> Send a Message
                </Button>
              </div>
            </div>
          )}

          {/* PDF iframe */}
          {pdfStatus !== 'error' && (
            <iframe
              src={RESUME_PDF}
              title="Amit Resume"
              className={`w-full border-0 transition-opacity duration-400 ${
                pdfStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ minHeight: '80vh' }}
              onLoad={() => setPdfStatus('loaded')}
              onError={() => setPdfStatus('error')}
            />
          )}
        </motion.div>

        {pdfStatus === 'loaded' && (
          <p className="text-center text-xs text-(--text-muted) mt-4">
            Having trouble viewing?{' '}
            <a
              href={RESUME_PDF}
              download="Amit_Rawat_Resume.pdf"
              className="text-(--accent-blue) hover:underline font-semibold"
            >
              Download the PDF directly
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
