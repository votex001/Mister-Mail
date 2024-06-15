import { useState, useEffect } from 'react'

export function useWith720p() {
  const [isWith720p, setIsWith720p] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 720px)')
    setIsWith720p(mediaQuery.matches)
    const handleResize = () => {
      setIsWith720p(mediaQuery.matches)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isWith720p
}
