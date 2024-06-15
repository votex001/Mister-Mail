import { MailPreview } from './MailPreview'
import { SortMenu } from './SortMenu'

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
