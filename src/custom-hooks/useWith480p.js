import { useState, useEffect } from 'react'

export function useWith480p() {
  const [isWith480p, setIsWith480p] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 480px)')
    setIsWith480p(mediaQuery.matches)
    const handleResize = () => {
      setIsWith480p(mediaQuery.matches)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isWith480p
}
