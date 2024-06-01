import { CiSearch } from 'react-icons/ci'
import img from '/icon.svg'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'

export function Header({ onSearchByName }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('txt') || '')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchByName(e.target.value)
    }
  }

  return (
    <div className="header">
      <section className="logo">
        <img src={img} /> MisterMail
      </section>
      <label htmlFor="search-input" className="custom-search">
        <label htmlFor="search-input">
          <CiSearch />
        </label>
        <input
          type="search"
          id="search-input"
          onChange={onChange}
          onKeyDown={onHandleKeyDown}
          value={value}
        />
      </label>
      <div>
      <LetteredAvatar name={defaultInfo.loggedinUser.fullName} size='40px'/>
      </div>
    </div>
  )
}
