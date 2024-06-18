//services
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { NavFolders } from './NavForders'

export function SideBar({ isWith720p, details }) {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  function onComposeClick() {
    if (!searchParams.get('compose')) {
      setSearchParams((prev) => {
        prev.set('compose', 'true')
        return prev
      })
    } else {
      setSearchParams((prev) => {
        prev.delete('compose')
        return prev
      })
    }
  }

  return (
    <nav className={`side-bar `}>
      <div className="compose-holder">
        <div className="compose" onClick={onComposeClick}>
          {isWith720p && 'Compose'}
        </div>
      </div>
      <NavFolders details={details} isWith720p={isWith720p} />
    </nav>
  )
}
