import { useEffect, useRef, useState } from 'react'
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdMailOpen,
  IoMdMailUnread,
  IoMdTrash,
} from 'react-icons/io'
import { MdRestoreFromTrash } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { TiDeleteOutline } from 'react-icons/ti'

export function SortMenu({
  sortMails,
  sortBy,
  mails,
  selectedMailIds,
  setSelectedMailIds,
  updateAllSelectedMails,
}) {
  const params = useParams()
  const basicSort = ['Date', 'Starred', 'Read', 'Subject']
  const [sortParams, setSortParams] = useState(basicSort)
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.indeterminate = !getIsAllChecked()
      ? !!selectedMailIds.length
      : false
  }, [selectedMailIds])

  useEffect(() => {
    loadParams()
    setSelectedMailIds([])
  }, [params])

  function setSortMails(sortName) {
    if (sortBy.by === sortName.toLowerCase() && sortBy.dir === 1) {
      sortMails({ dir: -1 })
    } else if (sortBy.by === sortName.toLowerCase() && sortBy.dir === -1) {
      sortMails({ dir: 1 })
    } else {
      sortMails({ by: sortName.toLowerCase(), dir: 1 })
    }
  }

  function onToggleAllChecked() {
    let newSelectedMailsIds = []
    if (!selectedMailIds.length) newSelectedMailsIds = mails.map((m) => m.id)
    setSelectedMailIds(newSelectedMailsIds)
  }

  function getIsAllChecked() {
    return selectedMailIds.length && mails.length === selectedMailIds.length
  }
  function onTrashClick() {
    if (params.folder !== 'bascket') {
      updateAllSelectedMails({ inTrash: true, removedAt: new Date() })
    } else {
      updateAllSelectedMails({ inTrash: false, removedAt: null })
    }
  }
  function onUnread() {
    updateAllSelectedMails({ isRead: false })
  }
  function loadParams() {
    if (params.folder === 'unread' || params.folder === 'draft') {
      setSortParams(
        basicSort.filter((sort) => {
          return sort != 'Read'
        })
      )
    } else if (params.folder === 'starred') {
      setSortParams(
        basicSort.filter((sort) => {
          return sort != 'Starred'
        })
      )
    } else {
      setSortParams(basicSort)
    }
  }

  return (
    <section className={`sort-menu ${!!selectedMailIds.length ? 'selected-menu' : ''}`}>
      <input
        type="checkbox"
        checked={getIsAllChecked()}
        ref={inputRef}
        onChange={onToggleAllChecked}
      />
      {!selectedMailIds.length &&
        sortParams.map((sort) => (
          <button
            key={sort}
            className={sortBy.by === sort.toLowerCase() ? 'selected' : ''}
            onClick={() => setSortMails(sort)}
          >
            {sort}
            {sortBy.by === sort.toLowerCase() && sortBy.dir === 1 && (
              <IoIosArrowDown />
            )}
            {sortBy.by === sort.toLowerCase() && sortBy.dir === -1 && (
              <IoIosArrowUp />
            )}
          </button>
        ))}
      {!!selectedMailIds.length && (
        <>
          <button className="select-button" onClick={() => onTrashClick()}>
            {params.folder === 'bascket' ? (
              <MdRestoreFromTrash className="side-icon" />
            ) : (
              <IoMdTrash className="side-icon" />
            )}
          </button>
          <button
            className="select-button"
            onClick={() => updateAllSelectedMails({ isRead: false })}
          >
            <IoMdMailUnread className="side-icon" />
          </button>
          <button
            className="select-button"
            onClick={() => updateAllSelectedMails({ isRead: true })}
          >
            <IoMdMailOpen className="side-icon" />
          </button>
        </>
      )}
    </section>
  )
}
