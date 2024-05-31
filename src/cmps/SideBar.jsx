//services
import { useEffect, useState } from 'react'
import { NavLink, Link, useParams, useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { defaultInfo } from '../services/default-emails'

// icons
import img from '/icon.svg'
import { IoMdMailUnread } from 'react-icons/io'
import { FaRegTrashAlt } from 'react-icons/fa'
import { GoPencil } from 'react-icons/go'
import { IoMdSend } from 'react-icons/io'
import { FaInbox } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'

export function SideBar({ emails }) {

  // Initialize the state variables
  const [details, setDetails] = useState({ unRead: 0, inTrash: 0, starred: 0 })
  const [searchParams, setSearchParams] = useSearchParams()

  // Call the onInit function when the component is mounted
  useEffect(() => {
    onInit()
  }, [emails])

  // Define the onInit function to fetch mailbox data and update the state
  async function onInit() {
    const emails = await mailService.query()
    const details = emails?.reduce((a, b) => {
      if (!b.isRead && b.to === defaultInfo.loggedinUser.email && !b.inTrash) a.unRead++
      if (b.inTrash && b.to === defaultInfo.loggedinUser.email) a.inTrash++
      if (b.isStarred && b.to === defaultInfo.loggedinUser.email) a.starred++
      return a
    }, { unRead: 0, inTrash: 0, starred: 0 })
    setDetails(details) // Update the state with the new details
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
      <div>
        <NavLink to={'/all'} className="flex nav"><span><FaInbox className="icon" /> All mail</span></NavLink>
      </div>
      <div>
        <NavLink to={'/sent'} className="flex nav"><span><IoMdSend /> Sent</span></NavLink>
      </div>
      <div>
        <NavLink to={'/unread'} className="flex nav"><span><IoMdMailUnread /> Unread </span>   {details?.unRead || 0}</NavLink>
      </div>
      <div>
        <NavLink to={'/starred'} className="flex nav"><span><FaStar /> Starred </span>  {details?.starred || 0}</NavLink>
      </div>
      <div>
        <NavLink to={'/trash'} className="flex nav"><span><FaRegTrashAlt /> Bascket</span>   {details?.inTrash || 0}</NavLink>
      </div>
    </nav>
  )
}