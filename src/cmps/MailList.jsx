import { MailPreview } from './MailPreview'
import { SortMenu } from './SortMenu'

export function MailList({ mails,sortMails,sortBy, ...otherFunctions }) {
 
  return (
    <div className="emails">
      {!!mails?.length&&<SortMenu sortMails={sortMails} sortBy={sortBy}/>}
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
