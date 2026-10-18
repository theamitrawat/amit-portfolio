import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiClock } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import ContactForm from '../components/ContactForm'

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'theamitrwt@gmail.com',
    href: 'mailto:theamitrwt@gmail.com',
    Icon: FiMail,
    external: false,
    desc: 'Best way to reach me',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/theamitrawat',
    href: 'https://linkedin.com/in/theamitrawat',
    Icon: FiLinkedin,
    external: true,
    desc: 'Connect professionally',
  },
  {
    label: 'GitHub',
    value: 'github.com/theamitrawat',
    href: 'https://github.com/theamitrawat',
    Icon: FiGithub,
    external: true,
    desc: 'Browse my code',
  },
  {
    label: 'LeetCode',
    value: 'leetcode.com/u/theamitrawat',
    href: 'https://leetcode.com/u/theamitrawat',
    Icon: SiLeetcode,
    external: true,
    desc: '200+ problems solved',
  },
]

const AVAILABILITY = [
  { icon: '💼', text: 'Full-time AI/ML positions'   },
  { icon: '🎯', text: 'Internship opportunities'    },
  { icon: '🤝', text: 'Freelance / contract work'   },
  { icon: '🚀', text: 'Open-source collaboration'   },
]

export default function Contact() {
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
              Contact
            </span>
            <h1 className="text-hero font-bold text-(--text-primary) mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-base text-(--text-secondary) max-w-lg mx-auto">
              Open to opportunities, collaborations, and conversations. Feel free to reach out.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="content-shell page-content-area">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Contact Form (wider) ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-(--text-primary) mb-1">Send a Message</h2>
                <p className="text-sm text-(--text-secondary)">I read every message and reply personally.</p>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* ── Info panel (narrower) ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Intro card */}
            <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-6 space-y-4">
              <h2 className="text-lg font-bold text-(--text-primary)">Get In Touch</h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed">
                I'm currently open to internship and full-time opportunities in AI/ML and
                software engineering. Whether it's a project, a role, or just a conversation
                — I'd love to connect.
              </p>

              {/* Contact links */}
              <ul className="space-y-3" role="list">
                {CONTACT_INFO.map(({ label, value, href, Icon, external, desc }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      aria-label={`${label}: ${value}`}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-(--border) bg-(--bg-secondary) text-(--accent-blue) group-hover:border-(--border-hover) group-hover:bg-(--bg-elevated) transition-all duration-200 flex-shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">{label}</p>
                        <p className="text-sm text-(--text-secondary) group-hover:text-(--accent-blue) transition-colors duration-200 truncate">
                          {value}
                        </p>
                        <p className="text-xs text-(--text-muted)">{desc}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location + response */}
            <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-(--text-secondary)">
                <FiMapPin className="w-4 h-4 text-(--accent-blue) flex-shrink-0" aria-hidden="true" />
                <span>Based in <strong className="text-(--text-primary)">Faridabad, Haryana 121102, India</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-(--text-secondary)">
                <FiClock className="w-4 h-4 text-(--accent-green) flex-shrink-0" aria-hidden="true" />
                <span>Response within <strong className="text-(--text-primary)">24–48 hours</strong></span>
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-(--border) bg-(--bg-card) p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted)">Open To</p>
              <ul className="space-y-2" role="list">
                {AVAILABILITY.map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm text-(--text-secondary)">
                    <span aria-hidden="true">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
