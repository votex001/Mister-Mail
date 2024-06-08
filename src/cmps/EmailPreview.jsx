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

export function EmailPreview({
  email,
  onToggleStar,
  onSendToTrash,
  onRemove,
  onRead,
  isRemovedAtTime,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const removedAtTime = isRemovedAtTime
    ? new Date(email.removedAt).toJSON()
    : new Date(email.sentAt).toJSON()
  const date = new Date(removedAtTime).toLocaleDateString()

  function slicedName(name) {
    if (name === defaultInfo.loggedinUser.email) return 'Me'
    const capitalName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalName.split('@')[0]
  }
  function onEdit() {
    if (!email.onDraft) return
    setSearchParams((prev) => {
      prev.set('compose', email.id)
      return prev
    })
  }
  return (
    <section
      className={`email ${email.isRead ? 'read' : ''} ${
        email.inTrash ? 'trash' : ''
      }`}
      onClick={onEdit}
    >
      {!email.inTrash && (
        <button className="email-icon star" onClick={() => onToggleStar(email)}>
          {email.isStarred ? (
            <IoIosStar className="is-starred" />
          ) : (
            <IoMdStarOutline />
          )}
        </button>
      )}
      <Link className="link" to={`${email.onDraft ? '' : email.id}`}>
        <h3 className={`name ${email.onDraft?"draft":""}`}>
          {email.onDraft ? 'Draft' : slicedName(email.from)}
        </h3>
        <p className="subject">{email.subject}</p>
        <p className="date">{date}</p>
      </Link>
      <button className="email-icon trash" onClick={(e) =>{ e.stopPropagation();onSendToTrash(email)}}>
        {email.inTrash ? (
          <MdRestoreFromTrash className="side-icon" />
        ) : (
          <IoMdTrash className="side-icon" />
        )}
      </button>
      <button className="email-icon" onClick={() => onRead(email)}>
        {email.isRead ? (
          <IoMdMailUnread className="side-icon" />
        ) : (
          <IoMdMailOpen className="side-icon" />
        )}
      </button>
      {email.inTrash && (
        <button
          className="email-icon removeh"
          onClick={() => onRemove(email.id)}
        >
          {<TiDeleteOutline className="side-icon" />}
        </button>
      )}
    </section>
  )
}
