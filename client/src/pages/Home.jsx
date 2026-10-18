import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload, FiMail, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'

import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import ProjectCard from '../components/ProjectCard'
import Timeline from '../components/Timeline'
import ContactForm from '../components/ContactForm'
import Button from '../components/Button'

import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { education } from '../data/education'
import { certificates } from '../data/certificates'
import { codingProfiles } from '../data/codingProfiles'
import { formatDate } from '../utils/formatDate'

const SOCIAL_LINKS = [
  { href: 'https://github.com/theamitrawat',      label: 'GitHub',   Icon: FiGithub   },
  { href: 'https://linkedin.com/in/theamitrawat', label: 'LinkedIn', Icon: FiLinkedin },
  { href: 'https://leetcode.com/u/theamitrawat',  label: 'LeetCode', Icon: SiLeetcode },
]

const STATS = [
  { value: '3+',   label: 'AI/ML Projects', desc: 'Production-deployed' },
  { value: '200+', label: 'DSA Problems',   desc: 'LeetCode solved'     },
  { value: '7.98', label: 'MCA CGPA',       desc: 'Banaras Hindu Univ.' },
  { value: '2+',   label: 'Years Learning', desc: 'AI/ML & Full Stack'  },
]

const featuredProjects = projects.filter(p => p.featured).slice(0, 3)

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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

/* Thin divider between same-background sections */
function Divider() {
  return <div className="section-divider-line" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      {/* ════════════════════════════════════════
          HERO  (bg-primary)
      ════════════════════════════════════════ */}
      <section
        className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden dot-grid"
        style={{ background: 'var(--bg-primary)' }}
        aria-label="Hero introduction"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="glow-blob glow-blob-blue -top-32 -left-40 opacity-60"
            style={{ width: '600px', height: '600px' }}
          />
          <div
            className="glow-blob glow-blob-purple bottom-0 right-0 opacity-50"
            style={{ width: '500px', height: '500px' }}
          />
        </div>

        <div className="relative content-shell-narrow w-full py-4 md:py-1 text-center flex items-center justify-center min-h-[calc(100vh-64px)]">
          <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto w-full max-w-5xl flex flex-col items-center text-center">

            {/* "Open to Opportunities" badge */}
            <motion.div variants={fadeUp} className="flex justify-center pt-2 mb-3">
              <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-(--border-hover) tag-pill-accent text-xs font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-(--accent-green) animate-pulse" aria-hidden="true" />
                Open to Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} className="mb-2">
              <p className="text-sm font-semibold text-(--text-muted) tracking-[0.2em] uppercase mb-3">
                Hi, I'm
              </p>
              <h1
                className="gradient-text font-black leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', letterSpacing: '-0.025em' }}
              >
                Amit
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-xl sm:text-2xl font-semibold text-(--text-secondary) mb-3">
              AI/ML Engineer &nbsp;·&nbsp; Generative AI &amp; RAG
            </motion.p>

            {/* Bio */}
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-4xl mx-auto mb-5">
              I build intelligent, production-grade AI/ML solutions — RAG pipelines,
              predictive models, and data-driven dashboards. Passionate about LLMs,
              Generative AI, and turning raw data into real-world impact.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5 mb-5">
              <Button
                to="/projects"
                variant="primary"
                className="min-w-[188px] px-8 py-3 text-[15px] font-bold"
              >
                View Projects <FiArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button
                to="/resume"
                variant="secondary"
                className="min-w-[150px] px-6 py-2.5 text-[14px]"
              >
                <FiDownload className="w-4 h-4" aria-hidden="true" /> Resume
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                className="min-w-[150px] px-6 py-2.5 text-[14px]"
              >
                <FiMail className="w-4 h-4" aria-hidden="true" /> Contact
              </Button>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex justify-center gap-3 mb-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} profile`}
                  className="flex items-center justify-center w-11 h-11 rounded-xl border border-(--border) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-hover) hover:bg-(--bg-secondary) transition-all duration-200"
                >
                  <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {STATS.map(({ value, label, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-(--border) bg-(--bg-card) p-2 text-center hover:border-(--border-hover) transition-all duration-200"
                >
                  <p className="stat-number">{value}</p>
                  <p className="text-xs font-semibold text-(--text-primary) mt-2">{label}</p>
                  <p className="text-[10px] text-(--text-muted) mt-0.5">{desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT  (bg-secondary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-secondary)' }}
        aria-labelledby="home-about-title"
      >
        <div className="content-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}
              className="space-y-5"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-(--accent-blue) mb-2">About Me</p>
                <h2 id="home-about-title" className="text-hero font-bold text-(--text-primary)">
                  Building AI that matters
                </h2>
              </div>
              <div className="h-1 w-14 rounded-full" style={{ background: 'var(--accent-gradient)' }} aria-hidden="true" />
              <p className="text-(--text-secondary) leading-relaxed">
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
              
              <Button to="/about" variant="secondary">
                Learn More <FiArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { label: 'Location',  value: 'Faridabad, Haryana 121102', icon: '📍' },
                { label: 'Degree',    value: 'MCA — BHU (CGPA 7.98)', icon: '🎓' },
                { label: 'Focus',     value: 'AI/ML, RAG, LLMs',       icon: '🤖' },
                { label: 'Available', value: 'Internship & Full-time',  icon: '✅' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="rounded-2xl border border-(--border) bg-(--bg-card) p-5 hover:border-(--border-hover) transition-all duration-200">
                  <span className="text-2xl block mb-2" aria-hidden="true">{icon}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-(--text-muted) mb-1">{label}</p>
                  <p className="text-sm font-semibold text-(--text-primary)">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SKILLS  (bg-primary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-primary)' }}
        aria-labelledby="skills-title"
      >
        <div className="content-shell">
          <SectionTitle id="skills-title" title="Technical Skills"
            subtitle="A full-stack AI engineer's toolkit — from data pipelines to production deployments."
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
                    {items.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED PROJECTS  (bg-secondary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-secondary)' }}
        aria-labelledby="featured-projects-title"
      >
        <div className="content-shell">
          <SectionTitle id="featured-projects-title" title="Featured Projects"
            subtitle="Production-deployed AI/ML systems built from the ground up."
            badge="Work"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </div>
          <div className="text-center">
            <Button to="/projects" variant="secondary">
              View All Projects <FiArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EDUCATION  (bg-primary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-primary)' }}
        aria-labelledby="education-title"
      >
        <div className="content-shell-narrow">
          <SectionTitle id="education-title" title="Education" badge="Academic" />
          <Timeline entries={education} type="education" />
        </div>
      </section>

      {/* ════════════════════════════════════════
          CERTIFICATES  (bg-secondary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-secondary)' }}
        aria-labelledby="certificates-title"
      >
        <div className="content-shell">
          <SectionTitle id="certificates-title" title="Certificates"
            subtitle="Verified credentials from leading institutions."
            badge="Learning"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-(--border) bg-(--bg-card) p-6 hover:border-(--border-hover) hover:shadow-[0_4px_20px_rgba(56,189,248,0.08)] transition-all duration-250 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'var(--accent-gradient)' }}
                  aria-hidden="true"
                />
                <div className="space-y-2">
                  <p className="font-bold text-(--text-primary) text-sm leading-snug">{cert.title}</p>
                  <p className="text-xs text-(--text-secondary)">{cert.issuer}</p>
                  <p className="text-xs text-(--text-muted)">{formatDate(cert.date)}</p>
                  {cert.verificationUrl && (
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-(--accent-blue) hover:underline mt-1"
                      aria-label={`Verify ${cert.title}`}
                    >
                      <FiExternalLink className="w-3 h-3" aria-hidden="true" /> Verify
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* divider: Certificates and Coding Profiles could share bg */}
      <Divider />

      {/* ════════════════════════════════════════
          CODING PROFILES  (bg-secondary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-secondary)' }}
        aria-labelledby="coding-profiles-title"
      >
        <div className="content-shell">
          <SectionTitle id="coding-profiles-title" title="Coding Profiles"
            subtitle="Where I practice, build, and connect."
            badge="Community"
          />
          <div className="flex flex-wrap justify-center gap-5">
            {codingProfiles.map((profile, i) => (
              <motion.a
                key={profile.platform}
                href={profile.url}
                target="_blank" rel="noopener noreferrer"
                aria-label={`${profile.platform} — ${profile.stat}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border border-(--border) bg-(--bg-card) hover:border-(--border-hover) hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)] transition-all duration-250 min-w-[11rem] text-center overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.06), transparent 70%)' }}
                  aria-hidden="true"
                />
                <span className="text-lg font-bold text-(--text-primary) group-hover:gradient-text transition-all duration-200">
                  {profile.platform}
                </span>
                <span className="text-xs text-(--text-muted)">{profile.stat}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT CTA  (bg-primary)
      ════════════════════════════════════════ */}
      <section
        className="section-band"
        style={{ background: 'var(--bg-primary)' }}
        aria-labelledby="contact-cta-title"
      >
        <div className="content-shell-narrow">
          <SectionTitle id="contact-cta-title" title="Let's Work Together"
            subtitle="Have a project, an opportunity, or just want to say hi? I'd love to hear from you."
            badge="Contact"
          />
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* form */}
            <div className="lg:col-span-3 rounded-2xl border border-(--border) bg-(--bg-card) p-6 sm:p-8">
              <ContactForm />
            </div>
            {/* info */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: '📧', label: 'Email',    value: 'theamitrwt@gmail.com',   href: 'mailto:theamitrwt@gmail.com'           },
                { icon: '💼', label: 'LinkedIn', value: 'in/theamitrawat',          href: 'https://linkedin.com/in/theamitrawat' },
                { icon: '🐙', label: 'GitHub',   value: 'github.com/theamitrawat', href: 'https://github.com/theamitrawat'     },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-(--border) bg-(--bg-card) hover:border-(--border-hover) transition-all duration-200 group"
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">{label}</p>
                    <p className="text-sm text-(--text-secondary) group-hover:text-(--accent-blue) transition-colors duration-200 truncate">{value}</p>
                  </div>
                </a>
              ))}
              <div className="p-4 rounded-2xl border border-(--border) bg-(--bg-secondary) text-center">
                <p className="text-xs text-(--text-muted)">
                  ⏱ Typical response: <span className="text-(--text-secondary) font-semibold">24–48 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
