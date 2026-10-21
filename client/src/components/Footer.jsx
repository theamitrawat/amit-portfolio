import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import logoImage from '../assets/logo.png'

const NAV_LINKS = [
  { to: '/',        label: 'Home'     },
  { to: '/projects',label: 'Projects' },
  { to: '/about',   label: 'About'    },
  { to: '/resume',  label: 'Resume'   },
  { to: '/contact', label: 'Contact'  },
]

const SOCIAL_LINKS = [
  { href: 'https://github.com/theamitrawat',       label: 'GitHub',   Icon: FiGithub   },
  { href: 'https://linkedin.com/in/theamitrawat',  label: 'LinkedIn', Icon: FiLinkedin },
  { href: 'https://leetcode.com/u/theamitrawat',   label: 'LeetCode', Icon: SiLeetcode },
  { href: 'mailto:theamitrwt@gmail.com',           label: 'Email',    Icon: FiMail     },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t border-(--border)"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* subtle top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--accent-gradient)', opacity: 0.4 }}
        aria-hidden="true"
      />

      <div className="content-shell py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img
                src={logoImage}
                alt=""
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold text-(--text-primary) tracking-tight">
                Amit<span className="gradient-text"> Rawat</span>
              </span>
            </Link>
            <p className="text-sm text-(--text-secondary) leading-relaxed max-w-xs">
              AI/ML Engineer building intelligent real-world solutions — RAG systems,
              predictive models, and data-driven applications.
            </p>
            {/* social icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-(--border) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-hover) hover:bg-(--bg-elevated) transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5" role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-(--text-secondary) hover:text-(--text-primary) hover:translate-x-0.5 inline-block transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact ── */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-4">
              Get In Touch
            </p>
            <div className="space-y-3">
              <a
                href="mailto:theamitrwt@gmail.com"
                className="block text-sm text-(--text-secondary) hover:text-(--accent-blue) transition-colors duration-200"
              >
                theamitrwt@gmail.com
              </a>
              <p className="text-xs text-(--text-muted) leading-relaxed">
                Open to internship &amp; full-time opportunities in AI/ML.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--accent-gradient)' }}
              >
                Say Hello →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-(--text-muted)">
            © {year} Amit. All rights reserved.
          </p>
          <p className="text-xs text-(--text-muted)">
            Built with React · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
