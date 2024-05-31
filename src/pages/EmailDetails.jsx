import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mailService } from "../services/mail.service";

import { Header } from "../cmps/Header";
import { HeaderDetails } from "../cmps/HeaderDetails";

export function EmailDetails() {
  const [mail, setMail] = useState()
  const params = useParams()

  useEffect(() => {
    getMail()
  }, [params.mailId])

  async function getMail() {
    const data = await mailService.getById(params.mailId)
    const readed = { ...data, isRead: true }
    setMail(data)
    await mailService.save(readed)
  }

  return (
    <div className="email-details">
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