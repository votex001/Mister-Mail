import { useState } from 'react'

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
