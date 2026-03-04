import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../hooks/use-theme'

export function ThemeToggle() {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition-colors hover:border-base-content/80 hover:text-base-content"
    >
      {isDark ? <FaSun size={14} aria-hidden="true" /> : <FaMoon size={14} aria-hidden="true" />}
    </button>
  )
}
