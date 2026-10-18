import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import { filterProjects } from '../utils/filterProjects'

const ALL_CATEGORIES = ['All', ...new Set(projects.flatMap(({ tags }) => tags))]

export default function Projects() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = filterProjects(
    projects,
    query,
    activeCategory === 'All' ? '' : activeCategory
  )

  function clearFilters() {
    setQuery('')
    setActiveCategory('All')
  }

  const hasFilters = query.trim() !== '' || activeCategory !== 'All'

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Page header band ── */}
      <div
        className="relative overflow-hidden page-header-band dot-grid"
        style={{ background: 'var(--bg-secondary)' }}
        aria-hidden="false"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-blob glow-blob-blue   w-[400px] h-[400px] -top-20 -right-10 opacity-40" />
          <div className="glow-blob glow-blob-purple w-[350px] h-[350px] bottom-0  left-0  opacity-30" />
        </div>
        <div className="relative content-shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 tag-pill-accent text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-(--border-hover) mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-(--accent-blue)" aria-hidden="true" />
              Portfolio
            </span>
            <h1 className="text-hero font-bold text-(--text-primary) mb-4">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base text-(--text-secondary) max-w-xl mx-auto">
              Production-deployed AI/ML systems, analytics platforms, and full-stack applications.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="content-shell page-content-area">
        {/* ── Search + filters ── */}
        <div className="mb-10 space-y-5">
          {/* Search input */}
          <div className="relative max-w-lg mx-auto">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search by name or technology…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search projects"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-(--border) bg-(--bg-card) text-(--text-primary) placeholder:text-(--text-muted) text-sm focus:outline-none focus:border-(--border-hover) focus:ring-2 focus:ring-(--accent-blue) focus:ring-opacity-20 transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors duration-200"
              >
                <FiX className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by technology">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 min-h-9 ${
                  activeCategory === cat
                    ? 'text-slate-950 border-transparent shadow-md'
                    : 'border-(--border) text-(--text-secondary) hover:border-(--border-hover) hover:text-(--text-primary) bg-(--bg-card)'
                }`}
                style={activeCategory === cat ? { background: 'var(--accent-gradient)' } : {}}
              >
                {cat}
              </button>
            ))}

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                aria-label="Clear filters"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border border-(--border) text-(--text-muted) hover:text-(--text-primary) hover:border-(--border-hover) bg-(--bg-card) transition-all duration-200 min-h-9"
              >
                <FiX className="w-3.5 h-3.5" aria-hidden="true" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {hasFilters && filteredProjects.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-(--text-muted) text-center mb-6"
          >
            Showing <span className="font-semibold text-(--text-primary)">{filteredProjects.length}</span> of <span className="font-semibold text-(--text-primary)">{projects.length}</span> projects
          </motion.p>
        )}

        {/* ── Grid or empty state ── */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-28"
              role="status"
            >
              <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
              <p className="text-lg font-bold text-(--text-primary) mb-2">No projects found</p>
              <p className="text-sm text-(--text-muted) mb-6">Try a different search term or clear the filter.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-(--accent-blue) hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
