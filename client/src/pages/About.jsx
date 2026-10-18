import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import Timeline from '../components/Timeline'
import Button from '../components/Button'
import { skills } from '../data/skills'
import { education } from '../data/education'

const SKILL_CATEGORIES = [
  'Programming Languages',
  'AI / Machine Learning',
  'AI / LLM Engineering',
  'Backend',
  'Data Analytics & BI',
  'Frontend',
  'Databases',
  'Developer Tools',
  'Core CS Concepts',
]

const groupedSkills = SKILL_CATEGORIES.reduce((acc, cat) => {
  const items = skills.filter(s => s.category === cat)
  if (items.length) acc[cat] = items
  return acc
}, {})

const PROFILE_LINKS = [
  { href: 'https://github.com/theamitrawat',      label: 'GitHub',   Icon: FiGithub,   value: 'github.com/theamitrawat'   },
  { href: 'https://linkedin.com/in/theamitrawat', label: 'LinkedIn', Icon: FiLinkedin, value: 'in/theamitrawat'            },
  { href: 'https://leetcode.com/u/theamitrawat',  label: 'LeetCode', Icon: SiLeetcode, value: '200+ problems'              },
  { href: 'mailto:theamitrwt@gmail.com',          label: 'Email',    Icon: FiMail,     value: 'theamitrwt@gmail.com'       },
]

export default function About() {
  return (
    <div>
      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden section-band dot-grid"
        style={{ background: 'var(--bg-primary)' }}
        aria-labelledby="about-bio-title"
      >
        {/* glow blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="glow-blob glow-blob-blue -top-20 -right-20 opacity-50"
            style={{ width: '500px', height: '500px' }}
          />
          <div
            className="glow-blob glow-blob-purple bottom-0 left-0 opacity-40"
            style={{ width: '400px', height: '400px' }}
          />
        </div>

        <div className="relative content-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Bio text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              {/* label */}
              <span className="inline-flex items-center gap-1.5 tag-pill-accent text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-(--border-hover)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent-blue)" aria-hidden="true" />
                About Me
              </span>

              <h1 id="about-bio-title" className="text-hero font-bold text-(--text-primary)">
                AI/ML Engineer &<br className="hidden sm:block" />
                <span className="gradient-text"> Full-Stack Builder</span>
              </h1>

              <div
                className="h-1 w-16 rounded-full"
                style={{ background: 'var(--accent-gradient)' }}
                aria-hidden="true"
              />

              <div className="space-y-4 text-(--text-secondary) leading-relaxed">
                <p>
                  Aspiring AI/ML Engineer and MCA (Software Engineering) graduate with hands-on
                  experience building Machine Learning, Deep Learning, and Generative AI
                  applications, including Retrieval-Augmented Generation (RAG) systems, predictive
                  models, and end-to-end data pipelines in Python. Skilled in Large Language Model
                  (LLM) integration, Natural Language Processing (NLP), vector search, and data
                  analysis, with a strong problem-solving foundation in Object-Oriented Programming
                  (OOP) and Data Structures &amp; Algorithms (200+ problems solved on LeetCode).
                  Eager to apply and grow AI/ML expertise to build production-ready, real-world
                  solutions.
                </p>
                <p>
                  My background spans Machine Learning, Deep Learning, Generative AI, Data
                  Analysis, and frontend development. I take pride in going end-to-end —
                  from data pipelines and model training to deploying polished, production-ready apps.
                </p>
                <p>
                  Outside projects, I actively solve algorithmic problems on LeetCode (200+
                  solved), stay current with LLM and RAG research, and look for opportunities
                  to collaborate on meaningful AI/ML work.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <Button to="/projects" variant="primary">
                  See My Work
                </Button>
                <Button to="/contact" variant="secondary">
                  <FiMail className="w-4 h-4" aria-hidden="true" /> Get In Touch
                </Button>
              </div>
            </motion.div>

            {/* Right — Cards */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="space-y-4"
            >
              {/* Quick info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Location',   value: 'Faridabad, Haryana 121102', icon: '📍' },
                  { label: 'Status',     value: 'Open to Opportunities', icon: '✅' },
                  { label: 'Degree',     value: 'MCA, BHU (CGPA 7.98)', icon: '🎓' },
                  { label: 'B.Sc.',      value: 'DU, CS Hons (CGPA 8.2)',icon: '🏛️' },
                  { label: 'Interests',  value: 'Generative AI, RAG',    icon: '🤖' },
                  { label: 'DSA',        value: '200+ LeetCode',         icon: '⚡' },
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-(--border) bg-(--bg-card) p-4 hover:border-(--border-hover) transition-all duration-200"
                  >
                    <span className="text-xl block mb-1.5" aria-hidden="true">{icon}</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-(--text-muted) mb-0.5">{label}</p>
                    <p className="text-xs font-semibold text-(--text-primary) leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              {/* Profile links */}
              <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted)">Find Me Online</p>
                <div className="space-y-2">
                  {PROFILE_LINKS.map(({ href, label, Icon, value }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={`${label}: ${value}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-(--bg-secondary) transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-(--border) text-(--accent-blue) bg-(--bg-secondary) group-hover:border-(--border-hover) transition-colors duration-200 shrink-0">
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-(--text-primary)">{label}</p>
                        <p className="text-xs text-(--text-muted) truncate">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-secondary)' }}
        aria-labelledby="about-skills-title"
      >
        <div className="content-shell">
          <SectionTitle
            id="about-skills-title"
            title="Technical Skills"
            subtitle="Technologies and tools I use to build AI/ML systems end-to-end."
            badge="Skills"
          />
          <div className="space-y-10">
            {SKILL_CATEGORIES.map(cat => {
              const items = groupedSkills[cat]
              if (!items) return null
              return (
                <div key={cat}>
                  <p className="skill-category-label">{cat}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {items.map((skill, i) => (
                      <SkillCard key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-primary)' }}
        aria-labelledby="about-education-title"
      >
        <div className="content-shell-narrow">
          <SectionTitle id="about-education-title" title="Education" badge="Academic" />
          <Timeline entries={education} type="education" />
        </div>
      </section>

    </div>
  )
}
