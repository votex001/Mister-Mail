import { CiSearch } from 'react-icons/ci'
import img from '/settings.svg'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'
import { SearchFilter } from './SearchFilter'
import { SearchSettings } from './SearchSettings'

import { useIsWith720p } from './useIsWith720p'
import { IoIosHelpCircleOutline } from 'react-icons/io'

export function Header({ onSearchByName, mails }) {
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('txt') || '')
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const isWith720p = useIsWith720p()
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false)
  const mainSectionRef = useRef(null)

  useEffect(() => {
    setSearchValue(searchParams.get('txt') || '')
  }, [searchParams.get('txt')])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mainSectionRef.current.contains(event.target)) {
        setIsSettingOpen(false)
        setIsSearchFilterOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mainSectionRef])

  const onChange = (e) => {
    setSearchValue(e.target.value)
    if (!e.target.value) {
      onSearchByName('')
    }
  }

  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchByName(e.target.value)
    }
  }

  const onSearch = () => {
    if (searchValue) {
      onSearchByName(searchValue)
    }
    setIsSettingOpen(false)
    setIsSearchFilterOpen(false)
  }

  function onOpenSettings() {
    setIsSettingOpen(true)
    setIsSettingOpen(false)
  }

  function onOpenSearchFilter() {
    setIsSearchFilterOpen(true)
    setIsSettingOpen(false)
  }

  return (
    <div className="header">
      <section className="logo">{isWith720p && 'MisterMail'}</section>
      <section
        className="custom-search"
        ref={mainSectionRef}
        onFocus={onOpenSearchFilter}
      >
        <span className="search-logo" onClick={onSearch}>
          <CiSearch />
        </span>
        <input
          type="search"
          id="search-input"
          autoComplete="off"
          placeholder="Search inbox"
          onChange={onChange}
          onKeyDown={onHandleKeyDown}
          value={searchValue}
        />

        <span className="settings">
          <img src={img} onClick={onOpenSettings} />
        </span>

        {isSearchFilterOpen && (
          <SearchFilter
            searchValue={searchValue}
            mails={mails}
            setIsSearchFilterOpen={setIsSearchFilterOpen}
          />
        )}
        {isSettingOpen && <SearchSettings />}
      </section>

      <div className="profile-menu">
        <Link to={'?compose=true&to=help@gmail.com&subject=Help'}>
          <IoIosHelpCircleOutline />
        </Link>
        <LetteredAvatar
          name={defaultInfo.loggedinUser.fullName}
          size="40px"
          className="profile-img"
        />
      </div>
    </div>
  )
}
