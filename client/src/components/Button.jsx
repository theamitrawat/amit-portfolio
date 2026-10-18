import { Link } from 'react-router-dom'

/**
 * Polymorphic premium button.
 * variant: 'primary' | 'secondary' | 'ghost' | 'outline'
 * Renders as <Link>, <a>, or <button> based on props.
 */
export default function Button({
  variant = 'primary',
  children,
  onClick,
  href,
  to,
  download,
  disabled = false,
  type = 'button',
  className = '',
  style = {},
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-sm font-bold tracking-[0.02em] leading-none transition-all duration-200 min-h-[3.2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-blue) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variantStyles = {
    primary: {
      style: {
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(37, 99, 235, 0.95) 42%, rgba(124, 58, 237, 0.92) 100%)',
        color: '#f8fafc',
        boxShadow: '0 12px 26px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
        border: '1px solid rgba(148, 163, 184, 0.22)',
      },
      className: 'min-w-[118px] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.32)] active:translate-y-0 active:scale-[0.99]',
    },
    secondary: {
      style: {
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(37, 99, 235, 0.95) 42%, rgba(124, 58, 237, 0.92) 100%)',
        color: '#f8fafc',
        boxShadow: '0 12px 26px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255,255,255,0.16)',
        border: '1px solid rgba(148, 163, 184, 0.22)',
      },
      className: 'min-w-[118px] font-semibold hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(37,99,235,0.32)] active:translate-y-0 active:scale-[0.99]',
    },
    ghost: {
      style: {
        background: 'transparent',
        color: 'var(--text-secondary)',
      },
      className: 'min-w-[118px] font-medium hover:text-(--text-primary) hover:bg-(--bg-secondary) active:translate-y-0',
    },
    outline: {
      style: {
        background: 'transparent',
        color: 'var(--accent-blue)',
        border: '1px solid rgba(56, 189, 248, 0.45)',
        boxShadow: '0 8px 18px rgba(59, 130, 246, 0.12)',
      },
      className: 'min-w-[118px] font-semibold hover:bg-(--bg-secondary) hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]',
    },
  }

  const chosen = variantStyles[variant] ?? variantStyles.primary
  const classes = `${base} ${chosen.className} ${className}`

  const props = {
    className: classes,
    style: { ...chosen.style, ...style },
    ...rest,
  }

  if (to) {
    return (
      <Link
        to={disabled ? '#' : to}
        aria-disabled={disabled}
        onClick={(e) => { if (disabled) { e.preventDefault(); return } onClick?.(e) }}
        {...props}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        download={download}
        aria-disabled={disabled}
        target={!download && !disabled ? '_blank' : undefined}
        rel={!download && !disabled ? 'noopener noreferrer' : undefined}
        onClick={(e) => { if (disabled) { e.preventDefault(); return } onClick?.(e) }}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
