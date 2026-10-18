import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin } from 'react-icons/fi'

export default function Timeline({ entries = [], type = 'education' }) {
  if (!entries || entries.length === 0) {
    return (
      <p className="text-center text-(--text-muted) py-8 text-sm">
        {type === 'education' ? 'No education entries.' : 'No experience entries.'}
      </p>
    )
  }

  return (
    <ol className="relative space-y-6">
      {entries.map((entry, i) => (
        <TimelineEntry key={i} entry={entry} type={type} index={i} isLast={i === entries.length - 1} />
      ))}
    </ol>
  )
}

function TimelineEntry({ entry, type, index, isLast }) {
  const isEdu = type === 'education'

  return (
    <motion.li
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex gap-5"
    >
      {/* ── Left: dot + line ── */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* dot */}
        <div
          className="relative z-10 flex items-center justify-center w-9 h-9 rounded-xl border border-(--border-hover) flex-shrink-0"
          style={{ background: 'var(--bg-elevated)' }}
          aria-hidden="true"
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: 'var(--accent-gradient)' }}
          />
        </div>
        {/* connecting line */}
        {!isLast && (
          <div
            className="w-px flex-1 mt-2 min-h-8"
            style={{ background: 'linear-gradient(to bottom, var(--border-hover), transparent)' }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Right: card ── */}
      <div className="flex-1 pb-2">
        <div className="group rounded-2xl border border-(--border) bg-(--bg-card) p-5 shadow-sm hover:border-(--border-hover) hover:shadow-[0_4px_20px_rgba(56,189,248,0.08)] transition-all duration-250">

          {/* header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              {isEdu ? (
                <>
                  <h3 className="text-base font-bold text-(--text-primary) leading-tight mb-1">
                    {entry.institution}
                  </h3>
                  <p className="text-sm font-semibold gradient-text">
                    {entry.degree}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-base font-bold text-(--text-primary) leading-tight mb-1">
                    {entry.role}
                  </h3>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-(--accent-blue)">
                    <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                    {entry.company}
                  </p>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-(--border) text-(--text-muted) bg-(--bg-secondary) whitespace-nowrap flex-shrink-0">
              <FiCalendar className="w-3 h-3" aria-hidden="true" />
              {isEdu ? entry.dateRange : entry.duration}
            </span>
          </div>

          {/* body */}
          {isEdu && entry.description && (
            <p className="text-sm text-(--text-secondary) leading-relaxed">
              {entry.description}
            </p>
          )}

          {!isEdu && Array.isArray(entry.responsibilities) && entry.responsibilities.length > 0 && (
            <ul className="space-y-2" aria-label="Responsibilities">
              {entry.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-(--text-secondary) leading-relaxed">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent-gradient)' }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.li>
  )
}
