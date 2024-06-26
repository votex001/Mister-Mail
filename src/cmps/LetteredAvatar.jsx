import { utilService } from '../services/util.service'

export function LetteredAvatar({
  name,
  size = '50px',
  radius = '100px',
  ...other
}) {
  let initials = name.split(' ')[0][0].toUpperCase()
  let color = utilService.getRandomColor(name)
  const customStyle = {
    display: 'flex',
    height: size,
    width: size,
    borderRadius: radius,
    color: 'white',
    backgroundColor: color,
  }
  return (
    <div style={customStyle} {...other}>
      <span style={{ margin: 'auto' }}>{initials}</span>
    </div>
  )
}
