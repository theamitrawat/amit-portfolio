import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useScrollY } from '../hooks/useScrollY'
import profilePhoto from '../assets/logo.jpeg'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { to: '/',        label: 'Home'     },
  { to: '/projects',label: 'Projects' },
  { to: '/about',   label: 'About'    },
  { to: '/resume',  label: 'Resume'   },
  { to: '/contact', label: 'Contact'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollY     = useScrollY()
  const location    = useLocation()
  const menuRef     = useRef(null)
  const hamburgerRef= useRef(null)
  const wasOpenRef  = useRef(false)

  const isScrolled = scrollY > 40

  /* close on viewport resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* close on browser back/forward navigation */
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('popstate', closeMenu)
    return () => window.removeEventListener('popstate', closeMenu)
  }, [location.pathname])

  /* focus trap */
  useEffect(() => {
    if (!menuOpen) return
    const menu = menuRef.current
    if (!menu) return
    const sel  = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const els  = [...menu.querySelectorAll(sel)]
    els[0]?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus(); return }
      if (e.key !== 'Tab') return
      const first = els[0], last = els[els.length - 1]
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus() } }
    }
    menu.addEventListener('keydown', onKey)
    return () => menu.removeEventListener('keydown', onKey)
  }, [menuOpen])

  /* return focus after close */
  useEffect(() => {
    if (wasOpenRef.current && !menuOpen) hamburgerRef.current?.focus()
    wasOpenRef.current = menuOpen
  }, [menuOpen])

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-(--border) shadow-[0_4px_24px_rgba(0,0,0,0.18)]'
            : 'border-b border-transparent'
        }`}
        style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="content-shell flex h-16 items-center justify-between"
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Amit — Home"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-blue) rounded-lg"
          >
            <img
              src={profilePhoto}
              alt=""
              className="h-8 w-8 rounded-full border border-(--border-hover) object-cover"
            />
            <span className="text-base font-bold text-(--text-primary) tracking-tight">
              Amit
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden items-center gap-2 md:flex" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  aria-current={location.pathname === to ? 'page' : undefined}
                  className={({ isActive }) =>
                    `relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-(--text-primary) bg-(--bg-elevated)'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                          style={{ background: 'var(--accent-gradient)' }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* CTA — visible on desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center gap-1.5 min-w-[150px] whitespace-nowrap px-7 py-3 rounded-full text-sm font-bold tracking-[0.02em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.32)] active:translate-y-0 active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(37, 99, 235, 0.95) 42%, rgba(124, 58, 237, 0.92) 100%)',
                color: '#f8fafc',
                boxShadow: '0 12px 26px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
                border: '1px solid rgba(148, 163, 184, 0.22)',
              }}
            >
              Hire Me
            </Link>

            {/* Hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(p => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-(--border) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-all duration-200"
            >
              {menuOpen
                ? <FiX    className="w-4.5 h-4.5" aria-hidden="true" />
                : <FiMenu className="w-4.5 h-4.5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="md:hidden border-t border-(--border)"
            style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <ul className="content-shell py-3 space-y-0.5" role="list">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    aria-current={location.pathname === to ? 'page' : undefined}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-11 ${
                        isActive
                          ? 'bg-(--bg-elevated) text-(--text-primary) font-semibold'
                          : 'text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full min-w-[150px] px-7 py-3 rounded-full text-sm font-bold tracking-[0.02em] text-white min-h-11 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(37, 99, 235, 0.95) 42%, rgba(124, 58, 237, 0.92) 100%)',
                    color: '#f8fafc',
                    boxShadow: '0 12px 26px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
                    border: '1px solid rgba(148, 163, 184, 0.22)',
                  }}
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
