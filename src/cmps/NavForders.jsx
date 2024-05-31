import { FaInbox, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { mailService } from "../services/mail.service";
import { IoMdMailUnread, IoMdSend } from "react-icons/io";
import { NavLink } from "react-router-dom";



export function NavFolders({details}){
    const folders={
     all: <FaInbox className="icon" />,
     sent: <IoMdSend />,
     unread: <IoMdMailUnread />,
     starred: <FaStar />,
     bascket: <FaRegTrashAlt />
    }
   
    return(
        <>
      {Object.keys(folders).map(folderName=>{
        const folder = folderName.charAt(0).toUpperCase() + folderName.slice(1);
        const number = details[folderName] >= 0 && folderName != "all"?details[folderName] : ""
        return (
            <div key={folderName}>
        <NavLink to={`/${folderName}`} className="flex nav"><span>{folders[folderName]} {folder} </span> {number}</NavLink>
      </div>
        )

      })}
        </>
    )
}