import { IoMailSharp } from 'react-icons/io5'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails';

export function SearchPreview({ searchResult }) {
  console.log(searchResult)
  return (
    <main className="search-preview">
      {!!searchResult.user.length &&
        searchResult.user.map((user) => (
          <section key={user.id} className="profile-result" onClick={(e)=>e.stopPropagation()}>
            <LetteredAvatar
              radius="0px"
              size="40px"
              name={user.fullName}
              className="search-avatar"
            />
            <div>
              <h3 className="profile-name">{user.fullName}</h3>
              <p className="profile-mail">{user.from}</p>
            </div>
          </section>
        ))}
{!!searchResult.mails.length && searchResult.mails.map((mail) =>{
const mailFrom = mail.fullName === defaultInfo.loggedinUser.fullName?"me":mail.fullName;
const mailTo = mail.to === defaultInfo.loggedinUser.email?"me":mail.to;
return(  <section key={mail.id} className='mail-resault'>
<IoMailSharp />
<div>
  <h3 className='mail-subject'>{mail.subject}</h3>
  <p className='mail-bottom'>{mailFrom},{mailTo}</p>
</div>
<p className='mail-date'>{new Date(mail.sentAt).toLocaleDateString()}</p>
  </section>
)}
)

}
    </main>
  )
}
