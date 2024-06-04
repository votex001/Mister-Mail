import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { defaultInfo } from '../services/default-emails'
import { useEffect, useRef, useState } from 'react'
import { mailService } from '../services/mail.service'

export function Compose({ onGetNewNessage }) {
  const [newMail, setNewMail] = useState({
    ...mailService.getCleanMail(),
    isRead: true,
    from: defaultInfo.loggedinUser.email,
  })
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const timeoutRef = useRef(null)

  useEffect(() => {
    checkIfMessageNew()
  }, [])

  useEffect(() => {
    onMakeDraft()
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [newMail])

  async function onSubmit(e) {
    e.preventDefault()
    await onGetNewNessage({ ...newMail, onDraft: false })
    navigate(`/${params.folder}`, { replace: true })
  }

  function onClose() {
    const keys = ['to',"subject","body"]
    if (keys.some((key) => newMail[key] !== '')) {
        onGetNewNessage({ ...newMail, onDraft: true }).then(() =>
        setSearchParams((prev) => {
          prev.delete('compose')
          return prev
        })
        )
    }else{
      setSearchParams((prev) => {
        prev.delete('compose')
        return prev
      })
    }
    
  }
  function onChangeForm(e) {
    const { id, value } = e.target
    setNewMail((prev) => ({ ...prev, [id]: value }))
  }

 async function checkIfMessageNew() {
  const compose = searchParams.get("compose")
    if (compose&&compose!=="true"||newMail.id) {
      mailService.getById(compose!=="true"?compose:newMail.id).then((value) => {
        if (value !== null) {
          setNewMail(value)
        }
      })
      }
    }
  
  async function onMakeDraft() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    const keys = ['to',"subject","body"]
    

    if (keys.some((key) => newMail[key] !== '')) {
      timeoutRef.current = setTimeout(() => {
        onGetNewNessage({ ...newMail, onDraft: true }).then((res) =>
          setNewMail({ ...res })
        )
      }, 3000)
    }
  }

  return (
    <dialog open={true} className="compose-dialog">
      <form className="compose-form" onSubmit={onSubmit}>
        <h1>
          New Mail
          <button type="button" onClick={onClose}>
            X
          </button>
        </h1>
        <p>From: {`${defaultInfo.loggedinUser.email}`}</p>
        <span>
          <label htmlFor="to">To: </label>
          <input
            value={newMail.to}
            type="email"
            id="to"
            required
            onChange={onChangeForm}
          ></input>
        </span>
        <span>
          <label htmlFor="subject">Subject: </label>
          <input
            value={newMail.subject}
            type="text"
            id="subject"
            required
            minLength="4"
            maxLength="18"
            onChange={onChangeForm}
          ></input>
        </span>
        <textarea
          value={newMail.body}
          id="body"
          placeholder="Your Message"
          required
          minLength="5"
          onChange={onChangeForm}
        ></textarea>
        <button>Send</button>
      </form>
    </dialog>
  )
}
