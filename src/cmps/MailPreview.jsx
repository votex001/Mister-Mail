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

export function MailPreview({
  mail,
  onToggleStar,
  onSendToTrash,
  onRemove,
  onRead,
  isRemovedAtTime,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const removedAtTime = isRemovedAtTime
    ? new Date(mail.removedAt).toJSON()
    : new Date(mail.sentAt).toJSON()
  const date = new Date(removedAtTime).toLocaleDateString()

  function slicedName(name) {
    if (name === defaultInfo.loggedinUser.email) return 'Me'
    const capitalName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalName.split('@')[0]
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
      className={`email ${mail.isRead ? 'read' : ''} ${
        mail.inTrash ? 'trash' : ''
      }`}
      onClick={onEdit}
    >
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
          {mail.onDraft ? 'Draft' : slicedName(mail.from)}
        </h3>
        <p className="subject">{mail.subject}</p>
        <p className="date">{date}</p>
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
      <button className="email-icon" onClick={() => onRead(mail)}>
        {mail.isRead ? (
          <IoMdMailUnread className="side-icon" />
        ) : (
          <IoMdMailOpen className="side-icon" />
        )}
      </button>
      {mail.inTrash && (
        <button
          className="email-icon removeh"
          onClick={() => onRemove(mail.id)}
        >
          {<TiDeleteOutline className="side-icon" />}
        </button>
      )}
    </section>
  )
}
