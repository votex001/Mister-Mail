import { useEffect, useState } from 'react'
import { mailService } from '../services/mail.service'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { SideBar } from '../cmps/SideBar'
import { MailList } from '../cmps/MailList'
import { Header } from '../cmps/Header'
import { Compose } from '../cmps/Compose'

export function EmailIndex() {
  const [mails, setMails] = useState(null)
  const [filter, setFilter] = useState(mailService.getDefaultFilter())
  const [sortBy, setSortBy] = useState({ by: 'date', dir: 1 })
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    updateFilter()
  }, [params, searchParams])

  useEffect(() => {
    loadEmails()
  }, [filter,sortBy])

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
    
    if (name) {
      setSearchParams((prev) => {
        prev.set('txt', name)
        return prev
      })
    } else
      setSearchParams((prev) => {
        prev.delete('txt')
        return prev
      })
  }

  function onGetNewNessage(newMessage) {
    return mailService.save(newMessage).then((res) => {
      updateFilter()
      return res
    })
  }

  function updateFilter() {
    if (!mailService.buildFilter(params.folder)) {
      return navigate('/all', { replace: true })
    }
    setFilter({
      ...mailService.getDefaultFilter(),
      ...mailService.buildFilter(params.folder),
      filterByName: searchParams.get('txt'),
    })
  }

  async function loadEmails() {
    const data = await mailService.query(filter,sortBy)
    setMails(data)
  }

  function sortMails(sortBy) {
    setSortBy(prev=>{return{...prev,...sortBy}})
  }
  return (
    <div className="email-index">
      <SideBar mails={mails} />
      {!params.mailId ? (
        <ul className="email-list">
          {searchParams.get('compose') && (
            <Compose onGetNewNessage={onGetNewNessage} />
          )}
          <Header onSearchByName={onSearchByName} />
          <MailList
            mails={mails}
            sortMails={sortMails}
            sortBy={sortBy}
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
