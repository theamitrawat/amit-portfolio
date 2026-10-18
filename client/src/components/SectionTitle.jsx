import { motion } from 'framer-motion'

/**
 * Premium section heading with optional badge, subtitle, and gradient underline.
 * @param {{ title: string, subtitle?: string, badge?: string, id?: string, align?: 'center'|'left' }} props
 */
export default function SectionTitle({ title, subtitle, badge, id, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-2xl' : ''}`}
    >
      {/* Optional badge */}
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-(--border-hover) tag-pill-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent-blue) inline-block" aria-hidden="true" />
          {badge}
        </span>
      )}

      <h2
        id={id}
        className="text-section font-bold text-(--text-primary) mb-3"
      >
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base text-(--text-secondary) leading-relaxed ${isCenter ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}

      {/* Gradient accent bar */}
      <div
        className={`mt-5 h-1 w-16 rounded-full ${isCenter ? 'mx-auto' : ''}`}
        style={{ background: 'var(--accent-gradient)' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
