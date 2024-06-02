import { IoMdMailUnread, IoMdTrash } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import { MdRestoreFromTrash } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate, useParams } from 'react-router'
import { mailService } from '../services/mail.service'
import img from '/icon.svg'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'
import { FaPencilAlt } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'


export function HeaderDetails({ mail }) {
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  async function onToggleTrash() {
    const updatedMail = { ...mail, inTrash: !mail.inTrash,onDraft:!mail.onDraft }
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
  function onEdit(){
    if (!searchParams.get('compose')) {
      setSearchParams((prev) => {
        prev.set('compose', mail.id)
        return prev
      })
    } else {
      setSearchParams((prev) => {
        prev.delete('compose')
        return prev
      })
    }
    
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
      {mail?.onDraft && <FaPencilAlt onClick={onEdit} />}
      </div>
      <div>
      <LetteredAvatar name={defaultInfo.loggedinUser.fullName} size='40px'/>
      </div>
    </div>
  )
}
