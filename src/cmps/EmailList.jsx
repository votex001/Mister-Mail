import { EmailPreview } from './EmailPreview'

export function EmailList({
  emails,
  isRemovedAtTime,
  onToggleStar,
  onSendToTrash,
  onRemove,
  onRead,
}) {
  return (
    <>
      {emails && (
        <>
          {emails.map((email) => (
            <EmailPreview
              isRemovedAtTime={isRemovedAtTime}
              email={email}
              key={email.id}
              onToggleStar={onToggleStar}
              onSendToTrash={onSendToTrash}
              onRemove={onRemove}
              onRead={onRead}
            />
          ))}
        </>
      )}
    </>
  )
}
