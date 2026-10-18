import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import { truncate } from '../utils/truncate'

const CATEGORY_COLORS = {
  'AI / LLM Engineering':  { bg: 'rgba(167,139,250,0.1)',  text: '#a78bfa', border: 'rgba(167,139,250,0.3)'  },
  'AI / Machine Learning': { bg: 'rgba(56,189,248,0.1)',   text: '#38bdf8', border: 'rgba(56,189,248,0.3)'   },
  'Data Analytics & BI':   { bg: 'rgba(52,211,153,0.1)',   text: '#34d399', border: 'rgba(52,211,153,0.3)'   },
  'Frontend Development':  { bg: 'rgba(244,114,182,0.1)',  text: '#f472b6', border: 'rgba(244,114,182,0.3)'  },
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(167,139,250,0.15) 100%)',
  'linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(56,189,248,0.15) 100%)',
  'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(52,211,153,0.15) 100%)',
]

export default function ProjectCard({ project, index = 0 }) {
  const { id, title, shortDescription, tags = [], thumbnailUrl, githubUrl, liveUrl, category } = project
  const visibleTags = tags.slice(0, 4)
  const catColor    = CATEGORY_COLORS[category] || CATEGORY_COLORS['AI / Machine Learning']
  const bgGradient  = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card) shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-(--border-hover) hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
    >
      {/* ── Thumbnail / Placeholder ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9', background: bgGradient }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          /* decorative placeholder */
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="space-y-1.5 w-32 opacity-40">
              {[75, 100, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ width: `${w}%`, background: 'var(--accent-gradient)' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category badge */}
        {category && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
            style={{ background: catColor.bg, color: catColor.text, borderColor: catColor.border }}
          >
            {category}
          </span>
        )}

        {/* Quick links overlay */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank" rel="noopener noreferrer"
              aria-label={`${title} GitHub`}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-(--bg-glass-heavy) backdrop-blur-sm border border-(--border) text-(--text-primary) hover:text-(--accent-blue) transition-colors duration-200"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <FiGithub className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank" rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-(--bg-glass-heavy) backdrop-blur-sm border border-(--border) text-(--text-primary) hover:text-(--accent-green) transition-colors duration-200"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-bold leading-snug text-(--text-primary) group-hover:gradient-text transition-all duration-200 line-clamp-2">
          {title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-(--text-secondary)">
          {truncate(shortDescription, 130)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {visibleTags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {tags.length > 4 && (
            <span className="tag-pill text-(--text-muted)">+{tags.length - 4}</span>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/projects/${id}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent-blue) hover:gap-2.5 transition-all duration-200 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-blue) rounded"
          aria-label={`View details for ${title}`}
        >
          View Details <FiArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}
