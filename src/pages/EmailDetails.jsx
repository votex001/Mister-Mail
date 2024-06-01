import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { HeaderDetails } from '../cmps/HeaderDetails'
import { Compose } from '../cmps/Compose'
import { LetteredAvatar } from '../cmps/LetteredAvatar'

export function EmailDetails() {
  const [mail, setMail] = useState()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

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
          <div className="email-header">
            <div className="avatar">
              <LetteredAvatar name={mail.from} />
            </div>
            <div className="email-info">
              <h2 className="email-subject">{mail.subject}</h2>
              <p className="email-from">{mail.from}</p>
              <p className="email-to">{mail.to}</p>
              <p className="email-date">
                {new Date(mail.sentAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="email-body">
            <p>{mail.body}</p>
          </div>
        </div>
      )}
    </div>
  )
}
