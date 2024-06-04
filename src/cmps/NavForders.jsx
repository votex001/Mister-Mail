import { FaInbox, FaRegTrashAlt, FaStar } from 'react-icons/fa'
import { IoMdMailUnread, IoMdSend } from 'react-icons/io'
import { RiDraftLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export function NavFolders({ details }) {
  const folders = {
    all: <FaInbox className="icon" />,
    sent: <IoMdSend />,
    unread: <IoMdMailUnread />,
    starred: <FaStar />,
    draft: <RiDraftLine />,
    bascket: <FaRegTrashAlt />,
  }
  return (
    <div className='folders'>
      {Object.keys(folders).map((folderName) => {
        const folder = folderName.charAt(0).toUpperCase() + folderName.slice(1)
        const number = details[folderName] >0 &&details[folderName]
        return (
          <div key={folderName}>
            <NavLink to={`/${folderName}`} className="flex nav">
              <div>
                {folders[folderName]} {folder}{' '}
              </div>{' '}
              {number}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}
