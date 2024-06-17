import { CiSearch } from 'react-icons/ci'
import img from '/settings.svg'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'
import { SearchFilter } from './SearchFilter'
import { SearchSettings } from './SearchSettings'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { useToggle } from '../custom-hooks/custom-hooks'

export function Header({ onSearchByName, mails, isWith720p }) {
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('txt') || '')
  const [isSettingOpen, setIsSetting] = useToggle(false)
  const [isSearchFilterOpen, setIsSearchFilter] = useToggle(false)
  const mainSectionRef = useRef(null)

  useEffect(() => {
    setSearchValue(searchParams.get('txt') || '')
  }, [searchParams.get('txt')])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mainSectionRef.current.contains(event.target)) {
        setIsSetting(false)
        setIsSearchFilter(false)
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
    setIsSetting(false)
    setIsSearchFilter(false)
  }

  function onOpenSettings() {
    setIsSetting(true)
    setIsSearchFilter(false)
  }

  function onOpenSearchFilter() {
    setIsSearchFilter(true)
    setIsSetting(false)
  }

  return (
    <div className="header">
      <section className="logo">{isWith720p && 'MisterMail'}</section>
      <section className="custom-search" ref={mainSectionRef}>
        <span className="search-logo" onClick={onSearch}>
          <CiSearch />
        </span>
        <input
          onFocus={onOpenSearchFilter}
          type="search"
          id="search-input"
          autoComplete="off"
          placeholder="Search inbox"
          onChange={onChange}
          onKeyDown={onHandleKeyDown}
          value={searchValue}
        />

        <span className="settings" onClick={onOpenSettings}>
          <img src={img} />
        </span>

        {isSearchFilterOpen && (
          <SearchFilter
            searchValue={searchValue}
            mails={mails}
            setIsSearchFilterOpen={setIsSearchFilter}
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
