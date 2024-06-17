import { BiSolidSend } from 'react-icons/bi'
import { FaRegStar, FaRegTrashAlt, FaStar, FaTrashAlt } from 'react-icons/fa'
import { IoMailUnread, IoMailUnreadOutline } from 'react-icons/io5'
import {
  RiDraftFill,
  RiDraftLine,
  RiInbox2Fill,
  RiInbox2Line,
} from 'react-icons/ri'
import { VscSend } from 'react-icons/vsc'
import { NavLink, useParams } from 'react-router-dom'

export function NavFolders({ details, isWith720p }) {
  const params = useParams()
  const folders = {
    all: params.folder === 'all' ? <RiInbox2Fill /> : <RiInbox2Line />,
    sent: params.folder === 'sent' ? <BiSolidSend /> : <VscSend />,
    unread:
      params.folder === 'unread' ? <IoMailUnread /> : <IoMailUnreadOutline />,
    starred: params.folder === 'starred' ? <FaStar /> : <FaRegStar />,
    draft: params.folder === 'draft' ? <RiDraftFill /> : <RiDraftLine />,
    bascket: params.folder === 'bascket' ? <FaTrashAlt /> : <FaRegTrashAlt />,
  }
  return (
    <div className="folders">
      {Object.keys(folders).map((folderName) => {
        const folder = folderName.charAt(0).toUpperCase() + folderName.slice(1)
        const number = details[folderName] > 0 && details[folderName]
        return (
          <div key={folderName}>
            <NavLink
              to={`/${folderName}`}
              className={`flex nav ${number ? 'notif' : ''}`}
            >
              <div>
                {folders[folderName]} {isWith720p && folder}{' '}
              </div>{' '}
              {isWith720p && number && <p>{number}</p>}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}
