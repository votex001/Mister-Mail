import { useEffect, useState } from 'react'
import { mailService } from '../services/mail.service'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { SideBar } from '../cmps/SideBar'
import { MailList } from '../cmps/MailList'
import { Header } from '../cmps/Header'
import { Compose } from '../cmps/Compose'
import { SortMenu } from '../cmps/SortMenu'
import { showErrorMsg } from '../services/event-bus.service'
import { useEffectUpdate, useWith480p, useWith720p } from '../custom-hooks/custom-hooks'

export function EmailIndex() {
  const isWith720p = useWith720p()
  const isWith480p = useWith480p()
  const [mails, setMails] = useState(null)
  const [filter, setFilter] = useState(mailService.getDefaultFilter())
  const [sortBy, setSortBy] = useState({ by: 'date', dir: 1 })
  const [selectedMailIds, setSelectedMailIds] = useState([])
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    updateFilter()
  }, [params, searchParams])

  useEffectUpdate(() => {
    loadEmails()
  }, [filter, sortBy])

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
      removedAt: mail.inTrash ? null : new Date().getTime(),
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
  function onToggleSelectMail(mailId) {
    setSelectedMailIds((prevSelected) => {
      if (prevSelected.includes(mailId))
        return prevSelected.filter((id) => id !== mailId)
      else return [...prevSelected, mailId]
    })
  }
  function updateAllSelectedMails(updateParam) {
    try {
      mailService.updateAll(selectedMailIds, updateParam).then(updateFilter)
    } catch (err) {
      console.error(err)
      showErrorMsg('Have some issues, check console.')
    }
  }

  function sortMails(sortBy) {
    setSortBy((prev) => {
      return { ...prev, ...sortBy }
    })
  }

  function updateFilter() {
    if (!mailService.buildFilter(params.folder)) {
      return navigate('/all', { replace: true })
    }
    const newFilter = {
      ...mailService.getDefaultFilter(),
      ...mailService.buildFilter(params.folder),
      filterByName: searchParams.get('txt'),
      before: searchParams.get('before'),
      after: searchParams.get('after'),
    }
    // update filter only if have some changes
    if (JSON.stringify(filter) !== JSON.stringify(newFilter)) {
      setFilter(newFilter)
    }
    setSelectedMailIds([])
  }

  async function loadEmails() {
    const data = await mailService.query(filter, sortBy)
    setMails(data)
  }

  return (
    <div className="email-index">
      <SideBar mails={mails} isWith720p={isWith720p} />
      {!params.mailId ? (
        <ul className="email-list">
          {searchParams.get('compose') && (
            <Compose onGetNewNessage={onGetNewNessage} />
          )}
          <Header
            onSearchByName={onSearchByName}
            mails={mails}
            isWith720p={isWith720p}
          />
          <SortMenu
            sortMails={sortMails}
            sortBy={sortBy}
            updateAllSelectedMails={updateAllSelectedMails}
            mails={mails}
            selectedMailIds={selectedMailIds}
            setSelectedMailIds={setSelectedMailIds}
          />
          <MailList
            isWith480p={isWith480p}
            isWith720p={isWith720p}
            mails={mails}
            selectedMailIds={selectedMailIds}
            onToggleSelectMail={onToggleSelectMail}
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
