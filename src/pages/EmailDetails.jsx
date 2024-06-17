import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { mailService } from '../services/mail.service'
import { HeaderDetails } from '../cmps/HeaderDetails'
import { Compose } from '../cmps/Compose'
import { LetteredAvatar } from '../cmps/LetteredAvatar'
import { useWith720p } from '../custom-hooks/custom-hooks'

export function EmailDetails() {
  const isWith720p = useWith720p()
  const [mail, setMail] = useState()
  const params = useParams()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    getMail()
  }, [params.mailId])
  function onGetNewNessage(newMessage) {
    return mailService.save(newMessage).then((res) => {
      getMail()
      return res
    })
  }

  async function getMail() {
    const data = await mailService.getById(params.mailId)
    const readed = { ...data, isRead: true }
    setMail(data)
    await mailService.save(readed)
  }

  return (
    <div className="email-details">
      {searchParams.get('compose') && (
        <Compose onGetNewNessage={onGetNewNessage} />
      )}
      <HeaderDetails mail={mail} isWith720p={isWith720p} />
      {mail && (
        <div className="details-main">
          <div className="email-header">
            <div className="avatar">
              <LetteredAvatar name={mail.from} />
            </div>
            <div className="email-info">
              <h2 className="email-subject">{mail.subject}</h2>
              <p className="email-from">{mail.from}</p>
              <Link to={`?compose=true&to=${mail.to}`} className="email-to">
                {mail.to}
              </Link>
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
