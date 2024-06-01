import { CiSearch } from 'react-icons/ci'
import img from '/icon.svg'

export function Header({ onSearchByName, mail }) {
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
        <input type="search" id="search-input" onKeyDown={onHandleKeyDown} />
      </label>
    </div>
  )
}
