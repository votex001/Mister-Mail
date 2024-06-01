import { IoMdMailUnread, IoMdTrash } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import { MdRestoreFromTrash } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate, useParams } from 'react-router'
import { mailService } from '../services/mail.service'
import img from '/icon.svg'


export function HeaderDetails({ mail }) {
  const navigate = useNavigate()
  const params = useParams()
  async function onToggleTrash() {
    const updatedMail = { ...mail, inTrash: !mail.inTrash }
    await mailService.save(updatedMail)
    goBack()
  }
  async function onDeleteForever() {
    await mailService.remove(mail.id)
    goBack()
  }
  async function onSetUnread() {
    const updatedMail = { ...mail, isRead: false }
    await mailService.save(updatedMail)
    goBack()
  }
  function goBack() {
    navigate(`/${params.folder}`, { replace: true })
  }
  return (
    <div className="header">
       <section className="logo">
        <img src={img} /> MisterMail
      </section>
      <div className='buttons'>

      <IoArrowBack onClick={goBack} />
      <IoMdMailUnread onClick={onSetUnread} />
      {mail?.inTrash ? (
        <MdRestoreFromTrash onClick={onToggleTrash} />
      ) : (
        <IoMdTrash onClick={onToggleTrash} />
      )}
      {mail?.inTrash && <TiDeleteOutline onClick={onDeleteForever} />}
      </div>
    </div>
  )
}
