import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mailService } from "../services/mail.service";


//icons
import { IoArrowBack } from "react-icons/io5";
import { IoMdMailUnread, IoMdTrash } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { MdRestoreFromTrash } from "react-icons/md";
import { Header } from "../cmps/Header";








export function EmailDetails() {
  const [mail, setMail] = useState()
  const params = useParams()


  useEffect(() => {
    getMail()
  }, [params.mailId])

  async function getMail() {
    const data = await mailService.getById(params.mailId)
    const readed = { ...data, isRead: true }
    await mailService.save(readed)
    setMail(data)
  }

  return (
    <div className="email-details">
      <Header mail={mail} />
      {mail &&
        <div className="details-main">
          <ul>
            <li className="email-subject">{mail.subject}</li>
            <li className="email-from">From: {mail.from}</li>
            <li className="email-to">To: {mail.to}</li>
          </ul>
          <p className="email-body">{mail.body}</p>
        </div>}
    </div>

  )
}