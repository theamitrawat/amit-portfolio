import { useState, useEffect } from 'react'

/**
 * Returns the current vertical scroll position (window.scrollY).
 * Updates on every scroll event.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  )

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}
