import { CiSearch } from 'react-icons/ci'

export function Header({ onSearchByName, mail }) {
  const onHandleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchByName(e.target.value)
    }
  }

  return (
    <div className="header">
      <label htmlFor="search-input" className="custom-search">
        <label htmlFor="search-input">
          <CiSearch />
        </label>
        <input type="search" id="search-input" onKeyDown={onHandleKeyDown} />
      </label>
    </div>
  )
}
