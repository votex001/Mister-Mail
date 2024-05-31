//services
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { NavFolders } from './NavForders'

// icons
import img from '/icon.svg'
import { GoPencil } from 'react-icons/go'


export function SideBar({ emails }) {

  // Initialize the state variables
  const [details, setDetails] = useState({ untead: 0, basket: 0, starred: 0 })
  const [searchParams, setSearchParams] = useSearchParams()

  

  useEffect(() => {
    loadDetails ()
  }, [emails])


  async function loadDetails () {
    const newDetails = await mailService.emailsCounter()
    setDetails(newDetails) // Update the state with the new details
  }

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

  // Render the sidebar with the navigation links
  return (
    <nav className={`side-bar `}>
      <section className="logo"><img src={img} /> MisterMail</section>
      <button className="compose" onClick={onComposeClick}><GoPencil /> Compose</button>
      <NavFolders details={details} />
    </nav>
  )
}