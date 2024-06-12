import { CiSearch } from 'react-icons/ci'
import img from '/settings.svg'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { LetteredAvatar } from './LetteredAvatar'
import { defaultInfo } from '../services/default-emails'
import { SearchFilter } from './SearchFilter'

export function Header({ onSearchByName, mails }) {
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('txt') || '')
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const mainSectionRef = useRef(null)
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false)

  useEffect(() => {
    setSearchValue(searchParams.get('txt') || '')
  }, [searchParams.get('txt')])

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
    onCloseSettings()
    onCloseSearchFilter()
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!mainSectionRef.current.contains(event.target)) {
        onCloseSettings()
        onCloseSearchFilter()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mainSectionRef])

  function onCloseSettings() {
    setIsSettingOpen(false)
  }

  function onCloseSearchFilter() {
    setIsSearchFilterOpen(false)
  }

  function onOpenSettings() {
    setIsSettingOpen(true)
    onCloseSearchFilter()
  }

  function onOpenSearchFilter() {
    setIsSearchFilterOpen(true)
    onCloseSettings()
  }

  return (
    <div className="header">
      <section className="logo">MisterMail</section>
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
          autoComplete='off'
          placeholder="Search inbox"
          onChange={onChange}
          onKeyDown={onHandleKeyDown}
          value={searchValue}
        />
        <span className="settings" onClick={onOpenSettings}>
          <img src={img} />
        </span>
        {isSearchFilterOpen && (
          <SearchFilter searchValue={searchValue} mails={mails} setIsSearchFilterOpen={setIsSearchFilterOpen} />
        )}
      </section>

      <div className="profile-menu">
        <LetteredAvatar
          name={defaultInfo.loggedinUser.fullName}
          size="40px"
          className="profile-img"
        />
      </div>
    </div>
  )
}
