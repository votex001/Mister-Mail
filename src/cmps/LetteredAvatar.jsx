import React from 'react'
import { utilService } from '../services/util.service'
import { defaultInfo } from '../services/default-emails'

export function LetteredAvatar({ name, size = '50px',className }) {
  let initials = name.split(' ')[0][0].toUpperCase()
  let color = utilService.getRandomColor(name)
  const customStyle = {
    display: 'flex',
    height: size,
    width: size,
    borderRadius: 'calc(100px)',
    color: 'white',
    backgroundColor: color,
    marginLeft: "auto"
  }
  return (
    <div  style={customStyle} className={className} >
      <span style={{ margin: 'auto' }}>{initials}</span>
    </div>
  )
}
