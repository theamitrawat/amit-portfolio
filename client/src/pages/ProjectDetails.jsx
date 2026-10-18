import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowLeft, FiZap } from 'react-icons/fi'
import { projects } from '../data/projects'
import NotFound from './NotFound'

const CATEGORY_COLORS = {
  'AI / LLM Engineering':  { bg: 'rgba(167,139,250,0.1)',  text: '#a78bfa', border: 'rgba(167,139,250,0.3)'  },
  'AI / Machine Learning': { bg: 'rgba(56,189,248,0.1)',   text: '#38bdf8', border: 'rgba(56,189,248,0.3)'   },
  'Data Analytics & BI':   { bg: 'rgba(52,211,153,0.1)',   text: '#34d399', border: 'rgba(52,211,153,0.3)'   },
  'Frontend Development':  { bg: 'rgba(244,114,182,0.1)',  text: '#f472b6', border: 'rgba(244,114,182,0.3)'  },
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(167,139,250,0.12) 100%)',
  'linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(56,189,248,0.12) 100%)',
  'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(52,211,153,0.12) 100%)',
]

export default function ProjectDetails() {
  const { id } = useParams()
  const projectIndex = projects.findIndex(p => p.id === id)
  const project = projects[projectIndex]

  if (!project) return <NotFound />

  const {
    title, description, tags = [], imageUrls = [], thumbnailUrl,
    githubUrl, liveUrl, challenge, solution, category, highlights = []
  } = project

  const images     = imageUrls.length > 0 ? imageUrls : thumbnailUrl ? [thumbnailUrl] : []
  const catColor   = CATEGORY_COLORS[category] || CATEGORY_COLORS['AI / Machine Learning']
  const bgGradient = PLACEHOLDER_GRADIENTS[projectIndex % PLACEHOLDER_GRADIENTS.length]

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Hero image banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(260px, 40vh, 480px)', background: bgGradient }}
        aria-hidden={images.length === 0}
      >
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover"
          />
        ) : (
          /* decorative placeholder bars */
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="space-y-3 w-48 opacity-30">
              {[80, 100, 60, 90].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full"
                  style={{ width: `${w}%`, background: 'var(--accent-gradient)' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Gradient overlay bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
          aria-hidden="true"
        />

        {/* Category badge */}
        {category && (
          <span
            className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
            style={{ background: catColor.bg, color: catColor.text, borderColor: catColor.border }}
          >
            {category}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="content-shell-narrow py-12 pb-24 -mt-8 relative z-10">
        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors duration-200 mb-8 group"
        >
          <FiArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* ── Project header ── */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-(--text-primary) leading-tight">
              {title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2" aria-label="Technologies used">
              {tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={`${title} — GitHub repository`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-(--border) text-sm font-semibold text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-hover) hover:bg-(--bg-secondary) transition-all duration-200"
                >
                  <FiGithub className="w-4 h-4" aria-hidden="true" /> View Source
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={`${title} — live demo`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-950 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <FiExternalLink className="w-4 h-4" aria-hidden="true" /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── Overview ── */}
          <section aria-labelledby="proj-overview" className="space-y-3">
            <h2 id="proj-overview" className="text-lg font-bold text-(--text-primary)">
              Overview
            </h2>
            <div
              className="h-0.5 w-10 rounded-full"
              style={{ background: 'var(--accent-gradient)' }}
              aria-hidden="true"
            />
            <p className="text-(--text-secondary) leading-relaxed">{description}</p>
          </section>

          {/* ── Highlights ── */}
          {highlights.length > 0 && (
            <section aria-labelledby="proj-highlights" className="rounded-2xl border border-(--border) bg-(--bg-card) p-6 space-y-4">
              <h2 id="proj-highlights" className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                <FiZap className="w-4 h-4 text-(--accent-blue)" aria-hidden="true" />
                Key Highlights
              </h2>
              <ul className="space-y-3" aria-label="Project highlights">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-(--text-secondary) leading-relaxed">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--accent-gradient)' }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Challenge ── */}
          {challenge && (
            <section aria-labelledby="proj-challenge" className="rounded-2xl border border-(--border) bg-(--bg-card) p-6 space-y-3">
              <h2 id="proj-challenge" className="text-base font-bold text-(--text-primary)">
                🎯 The Challenge
              </h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{challenge}</p>
            </section>
          )}

          {/* ── Solution ── */}
          {solution && (
            <section aria-labelledby="proj-solution" className="rounded-2xl border border-(--border) bg-(--bg-card) p-6 space-y-3">
              <h2 id="proj-solution" className="text-base font-bold text-(--text-primary)">
                💡 The Solution
              </h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{solution}</p>
            </section>
          )}

          {/* ── Gallery (only if images exist) ── */}
          {images.length > 1 && (
            <section aria-labelledby="proj-gallery" className="space-y-4">
              <h2 id="proj-gallery" className="text-base font-bold text-(--text-primary)">
                Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.slice(1).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`${title} screenshot ${i + 2}`}
                    className="w-full rounded-2xl border border-(--border) object-cover aspect-video"
                  />
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  )
}
