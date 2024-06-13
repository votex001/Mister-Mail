import { IoMdMailUnread, IoMdTrash } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import { MdRestoreFromTrash } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate, useParams } from 'react-router'
import { mailService } from '../services/mail.service'
import img from '/icon.svg'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'
import { useIsWith720p } from './useIsWith720p'

export function HeaderDetails({ mail }) {
  const isWith720p = useIsWith720p()
  const navigate = useNavigate()
  const params = useParams()

  async function onToggleTrash() {
    const updatedMail = {
      ...mail,
      inTrash: !mail.inTrash,
      onDraft: false,
    }
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
       {isWith720p&&'MisterMail'}
      </section>
      <div className="buttons">
        <IoArrowBack onClick={goBack} />
        <IoMdMailUnread onClick={onSetUnread} />
        {mail?.inTrash ? (
          <MdRestoreFromTrash onClick={onToggleTrash} />
        ) : (
          <IoMdTrash onClick={onToggleTrash} />
        )}
        {mail?.inTrash && <TiDeleteOutline onClick={onDeleteForever} />}
      </div>
      <div>
        <LetteredAvatar name={defaultInfo.loggedinUser.fullName} size="40px" className="profile-img"/>
      </div>
    </div>
  )
}
