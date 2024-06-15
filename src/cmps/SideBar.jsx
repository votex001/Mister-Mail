//services
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { NavFolders } from './NavForders'
import { useWith720p } from '../custom-hooks/useWith720p'

export function SideBar({ mails }) {
  const isWith720p = useWith720p()
  const [details, setDetails] = useState({
    unread: 0,
    bascket: 0,
    starred: 0,
    draft: 0,
  })
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    loadDetails()
  }, [mails])

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

  async function loadDetails() {
    const newDetails = await mailService.emailsCounter()
    setDetails(newDetails)
  }

  return (
    <nav className={`side-bar `}>
      <div className="compose-holder">
        <div className="compose" onClick={onComposeClick}>
          {isWith720p && 'Compose'}
        </div>
      </div>
      <NavFolders details={details} />
    </nav>
  )
}
