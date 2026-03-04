import { useCallback, useEffect, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'
const LIGHT = 'tksohishi'
const DARK = 'tksohishi-dark'

function apply(theme: string) {
  document.documentElement.setAttribute('data-theme', theme)
}

function getSnapshot(): boolean {
  return document.documentElement.getAttribute('data-theme') === DARK
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(cb: () => void): () => void {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next = isDark ? LIGHT : DARK
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
  }, [isDark])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      apply(stored)
      return
    }

    const mq = matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        apply(e.matches ? DARK : LIGHT)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return { isDark, toggle }
}
