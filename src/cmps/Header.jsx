import { CiSearch } from "react-icons/ci";
import { IoMdMailUnread, IoMdTrash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { MdRestoreFromTrash } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router";
import { mailService } from "../services/mail.service";

export function Header({ searchByName, mail }) {
        const _handleKeyDown = (e) => {
            if (e.key === 'Enter') {
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