import { Link, useSearchParams } from 'react-router-dom'
import { TiDeleteOutline } from 'react-icons/ti'
import {
  IoIosStar,
  IoMdMailOpen,
  IoMdMailUnread,
  IoMdStarOutline,
  IoMdTrash,
} from 'react-icons/io'
import { MdRestoreFromTrash } from 'react-icons/md'
import { defaultInfo } from '../services/default-emails'
import { useWith480p } from '../custom-hooks/useWith480p'
import { useWith720p } from '../custom-hooks/useWith720p'

export function MailPreview({
  mail,
  onToggleStar,
  onSendToTrash,
  onRemove,
  onRead,
  isRemovedAtTime,
  onToggleSelectMail,
  selectedMailIds,
}) {
  const isWith480p = useWith480p()
  const isWith720p = useWith720p()
  const [_, setSearchParams] = useSearchParams()
  const removedAtTime = isRemovedAtTime
    ? new Date(mail.removedAt).toJSON()
    : new Date(mail.sentAt).toJSON()
  const date = new Date(removedAtTime).toLocaleDateString()

  function getMailIsChecked() {
    return selectedMailIds.includes(mail.id)
  }

  function convertedName(name) {
    if (name === defaultInfo.loggedinUser.fullName) return 'Me'
    return name
  }
  function onEdit() {
    if (!mail.onDraft) return
    setSearchParams((prev) => {
      prev.set('compose', mail.id)
      return prev
    })
  }

  return (
    <section
      className={`email ${mail.isRead ? 'read' : ''} 
      ${mail.inTrash ? 'trash' : ''} `}
      onClick={onEdit}
    >
      <input
        type="checkbox"
        onClick={(ev) => ev.stopPropagation()}
        onChange={() => onToggleSelectMail(mail.id)}
        checked={getMailIsChecked()}
      />
      {!mail.inTrash && (
        <button className="email-icon star" onClick={() => onToggleStar(mail)}>
          {mail.isStarred ? (
            <IoIosStar className="is-starred" />
          ) : (
            <IoMdStarOutline />
          )}
        </button>
      )}
      <Link className="link" to={`${mail.onDraft ? '' : mail.id}`}>
        <h3 className={`name ${mail.onDraft ? 'draft' : ''}`}>
          {mail.onDraft ? 'Draft' : convertedName(mail.fullName)}
        </h3>
        {isWith480p && <p className="subject">{mail.subject}</p>}
        {isWith720p && <p className="date">{date}</p>}
      </Link>
      <button
        className="email-icon trash"
        onClick={(e) => {
          e.stopPropagation()
          onSendToTrash(mail)
        }}
      >
        {mail.inTrash ? (
          <MdRestoreFromTrash className="side-icon" />
        ) : (
          <IoMdTrash className="side-icon" />
        )}
      </button>
      <button
        className="email-icon"
        onClick={(e) => {
          e.stopPropagation()
          onRead(mail)
        }}
      >
        {mail.isRead ? (
          <IoMdMailUnread className="side-icon" />
        ) : (
          <IoMdMailOpen className="side-icon" />
        )}
      </button>
      {mail.inTrash && (
        <button
          className="email-icon remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(mail.id)
          }}
        >
          {<TiDeleteOutline className="side-icon" />}
        </button>
      )}
    </section>
  )
}
