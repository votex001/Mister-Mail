import { useEffect, useState } from 'react'
import { mailService } from '../services/mail.service'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { SideBar } from '../cmps/SideBar'
import { EmailList } from '../cmps/EmailList'
import { Header } from '../cmps/Header'

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filter, setFilter] = useState(mailService.getDefaultFilter())
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    updateFilter()
  }, [params, searchParams])

  useEffect(() => {
    loadEmails()
  }, [filter])

  async function onToggleStar(mail) {
    const updatedMail = {
      ...mail,
      isStarred: !mail.isStarred,
    }
    await mailService.save(updatedMail)
    updateFilter()
  }

  async function onSendToTrash(mail) {
    const updatedMail = {
      ...mail,
      inTrash: !mail.inTrash,
      isRead: true,
      isStarred: false,
      removedAt: mail.inTrash ? null : new Date(),
    }
    await mailService.save(updatedMail)
    updateFilter()
  }

  async function onRemove(id) {
    await mailService.remove(id)
    updateFilter()
  }
  async function onRead(mail) {
    const updatedMail = {
      ...mail,
      isRead: !mail.isRead,
    }
    await mailService.save(updatedMail)
    updateFilter()
  }

  function onSearchByName(name) {
    setFilter({
      ...filter,
      filterByName: name,
    })
  }

  async function onGetNewNessage(newMessage) {
    await mailService.save(newMessage)
    updateFilter()
  }

  function updateFilter() {
    if (!mailService.buildFilter(params.folder)) {
      return navigate('/all', { replace: true })
    }

    setFilter({
      ...mailService.getDefaultFilter(),
      ...mailService.buildFilter(params.folder),
    })
  }

  async function loadEmails() {
    const data = await mailService.query(filter)
    setEmails(data)
  }

  return (
    <div className="email-index flex">
      <SideBar emails={emails} />
      {!params.mailId ? (
        <ul className="email-list">
          {searchParams.get('compose') === 'true' && (
            <Compose onGetNewNessage={onGetNewNessage} />
          )}
          <Header onSearchByName={onSearchByName} />
          <EmailList
            emails={emails}
            isRemovedAtTime={params.folder === 'bascket'}
            onToggleStar={onToggleStar}
            onSendToTrash={onSendToTrash}
            onRemove={onRemove}
            onRead={onRead}
          />
        </ul>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
