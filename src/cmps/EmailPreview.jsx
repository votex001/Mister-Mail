import { Link } from 'react-router-dom';

import { TiDeleteOutline } from 'react-icons/ti';
import { IoIosStar, IoMdMailOpen, IoMdMailUnread, IoMdStarOutline, IoMdTrash } from 'react-icons/io';
import { MdRestoreFromTrash } from 'react-icons/md';
import { defaultInfo } from '../services/default-emails';

export function EmailPreview({ email, isOnStarred, sendToTrash, onRemove, onRead, isRemovedAtTime }) {
    const removedAtTime = isRemovedAtTime ? new Date(email.removedAt).toJSON() : new Date(email.sentAt).toJSON()
    const date = new Date(removedAtTime).toLocaleDateString();
    const read = email.isRead ? 'read' : '';
    const starIcon = email.isStarred ? <IoIosStar className='is-starred' onClick={() => isOnStarred(email)} /> : <IoMdStarOutline onClick={() => isOnStarred(email)} />;
    const readIcon = email.isRead ? <IoMdMailUnread className='side-icon' onClick={() => onRead(email)} /> : <IoMdMailOpen className='side-icon' onClick={() => onRead(email)} />;
    const trashIcon = email.inTrash ? <MdRestoreFromTrash onClick={() => sendToTrash(email)} className='side-icon' /> : <IoMdTrash className='side-icon' onClick={() => sendToTrash(email)} />;
    const deleteForever = email.inTrash && <TiDeleteOutline onClick={() => onRemove(email.id)} className='side-icon' />;

    function slicedName(name) {
        if (name === defaultInfo.loggedinUser.email) return "Me"
        const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
        return capitalName.split('@')[0];
    }
    return (
        <section className={`email ${read} flex`}>
            <div className='flex info'>
                {!email.inTrash && starIcon}
                <Link to={`${email.id}`} className='h3'>
                    <h3>{slicedName(email.from)}</h3>
                </Link>
                <Link to={`${email.id}`} className='subject'>{email.subject}</Link>
                <Link to={`${email.id}`} className='date'>{date}</Link>
            </div>
            {trashIcon}
            {readIcon}
            {deleteForever}
        </section>
    )
}