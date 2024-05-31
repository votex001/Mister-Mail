import { useEffect, useState } from "react"
import { mailService } from "../services/mail.service"
import { EmailPreview } from "../cmps/EmailPreview"
import { Outlet, useNavigate, useParams } from "react-router"
import { useSearchParams } from "react-router-dom"
import { Compose } from "../cmps/Compose"
import { CiSearch } from "react-icons/ci";
import { SideBar } from "../cmps/SideBar"
import { EmailList } from "../cmps/EmailList"
import { Header } from "../cmps/Header"






export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    const [isRemovedAtTime, setIsRemovedAtTime] = useState(false)
    const navigate = useNavigate();
    const [filterByName, setFilterByName] = useState('')
    const [searchParams] = useSearchParams()
    const compose = searchParams.get("compose")
    const params = useParams()



    useEffect(() => {
        updateFilter()
    }, [params, searchParams])

    useEffect(() => {
        loadEmails()
    }, [filter, filterByName])


    function searchByName(name) {
        setFilterByName(name)
    }

    async function isOnStarred(mail) {
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        await mailService.save(updatedMail)
        updateFilter()
    }

    async function sendToTrash(mail) {
        const updatedMail = { ...mail, inTrash: !mail.inTrash, isStarred: false, removedAt: mail.inTrash ? null : new Date() }
        await mailService.save(updatedMail)
        updateFilter()
    }

    async function onRemove(id) {
        await mailService.remove(id)
        updateFilter()
    }

    async function onRead(mail) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        await mailService.save(updatedMail)
        updateFilter()
    }
    async function getNewNessage(newMessage) {

        await mailService.save(newMessage)
        updateFilter()
    }



    function updateFilter() {
        const filter = {
            all: { sended: 'any' },
            unread: { isRead: false },
            starred: { isStarred: true },
            trash: { inTrash: true },
            sent: { sended: true },
        };

        setIsRemovedAtTime(params.mail === 'trash');

        if (!filter[params.mail]) {
            return navigate('/all', { replace: true });
        }

        setFilter({ ...mailService.getDefaultFilter(), ...filter[params.mail] });
    }
    async function loadEmails() {
        const data = await mailService.query(filter, filterByName)
        setEmails(data)
    }

    return (
        <div className="email-index flex">
            <SideBar emails={emails} />
            {!params.mailId ?
                (<ul className="email-list">
                    {compose === "true" && <Compose getNewNessage={getNewNessage} />}
                    <Header searchByName={searchByName} />
                    <EmailList
                        emails={emails}
                        isRemovedAtTime={isRemovedAtTime}
                        isOnStarred={isOnStarred}
                        sendToTrash={sendToTrash}
                        onRemove={onRemove}
                        onRead={onRead}
                    />
                </ul>) :
                <Outlet />
            }
        </div>
    )
}