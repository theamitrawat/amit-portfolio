import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../hooks/useTheme.js'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="p-2 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors duration-200 min-h-11 min-w-11 flex items-center justify-center"
    >
      {isDark ? (
        <HiSun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <HiMoon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}
