import { useState, useEffect, useCallback } from 'react'

const VALID = new Set(['summary','news','timeline','map','stats','sentiment','players'])

export function useHashRoute(defaultRoute = 'summary') {
  const getRoute = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase()
    return VALID.has(hash) ? hash : defaultRoute
  }

  const [route, setRoute] = useState(getRoute)

  const navigateTo = useCallback((id) => {
    window.location.hash = id
    setRoute(id)
  }, [])

  useEffect(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return [route, navigateTo]
}
