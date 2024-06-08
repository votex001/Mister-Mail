import { MailPreview } from './MailPreview'

export function MailList({ mails, ...otherFunctions }) {
  return (
    <div className="emails">
      {mails && (
        <>
          {mails.map((mail) => (
            <MailPreview mail={mail} key={mail.id} {...otherFunctions} />
          ))}
        </>
      )}
    </div>
  )
}
