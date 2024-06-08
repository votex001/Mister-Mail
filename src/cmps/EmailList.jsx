import { EmailPreview } from './EmailPreview'

export function EmailList({
  emails,...otherFunctions
  
}) {
  return (
    <div className="emails">
      {emails && (
        <>
          {emails.map((email) => (
            <EmailPreview
              email={email}
              key={email.id}
             { ...otherFunctions}
            />
          ))}
        </>
      )}
    </div>
  )
}
