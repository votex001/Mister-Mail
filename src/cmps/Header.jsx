import { CiSearch } from "react-icons/ci";
import { IoMdMailUnread, IoMdTrash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdRestoreFromTrash } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router";
import { mailService } from "../services/mail.service";








export function Header({ searchByName, mail }) {
    if (searchByName) {
        const _handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                console.log("lol")
                searchByName(e.target.value);
            }
        }
        return (
            <div className="header">
                <label htmlFor="search-input" className="custom-search">
                    <label htmlFor="search-input"><CiSearch /></label>
                    <input type="search" id="search-input" onKeyDown={_handleKeyDown} />
                </label>
            </div>
        )
    }

    if (mail) {
        const navigate = useNavigate();
        const params = useParams()
        const trashIcon = mail && mail.inTrash ? <MdRestoreFromTrash onClick={isTrash} /> : <IoMdTrash onClick={isTrash} />;
        const deleteForever = mail && mail.inTrash && <TiDeleteOutline onClick={onDeleteForever} />;
        async function isTrash() {
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
            navigate(`/${params.mail}`, { replace: true })
          }
        return (
            <div className="header">
                <IoArrowBack onClick={goBack} />
                <IoMdMailUnread onClick={onSetUnread} />
                {trashIcon}
                {deleteForever}
            </div>
        )
    }
}