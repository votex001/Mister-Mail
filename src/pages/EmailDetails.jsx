import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { HeaderDetails } from '../cmps/HeaderDetails'
import { Compose } from '../cmps/Compose'

export function EmailDetails() {
  const [mail, setMail] = useState()
  const params = useParams()
  const [searchParams,setSearchParams] =useSearchParams()

  useEffect(() => {
    getMail()
  }, [params.mailId])
  async function onGetNewNessage(newMessage) {
    await mailService.save(newMessage)
    updateFilter()
  }


  async function getMail() {
    const data = await mailService.getById(params.mailId)
    const readed = { ...data, isRead: true }
    setMail(data)
    await mailService.save(readed)
  }

  return (
    <div className="email-details">
      {searchParams.get('compose') === 'true' && (
            <Compose onGetNewNessage={onGetNewNessage} />
          )}
      <HeaderDetails mail={mail} />
      {mail && (
        <div className="details-main">
          <ul>
            <li className="email-subject">{mail.subject}</li>
            <li className="email-from">From: {mail.from}</li>
            <li className="email-to">To: {mail.to}</li>
          </ul>
          <p className="email-body">{mail.body}</p>
        </div>
      )}
    </div>
  )
}
