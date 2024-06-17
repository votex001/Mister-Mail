import { useState, useEffect, useRef } from 'react'

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
export function useEffectUpdate(callBack, dependencies) {
  const ifFirstRender = useRef(true)
  useEffect(() => {
    if (ifFirstRender.current) {
      ifFirstRender.current = false
      return
    }
    return callBack()
  }, dependencies)
}


export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = (appliedValue) => {
    if (typeof appliedValue === 'boolean') {
      setValue(appliedValue)
    } else {
      setValue(!value)
    }
  }
  return [value, toggle]
}
