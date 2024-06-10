import { useEffect, useRef, useState } from 'react'
import { mailService } from '../services/mail.service'
import { SearchPreview } from './SearchPreview'

export function SearchFilter({ searchValue, mails }) {
  const [searchResult, setSearchResult] = useState(null)
  function setSelected(e) {
    e.target.classList.toggle('selected')
  }
  useEffect(() => {
    getMails()
  }, [searchValue])

  function getMails() {
    if (searchValue.length) {
      const data = mailService.searchFounder(mails, searchValue, 1, 5)
      setSearchResult(data)
    } else {
      setSearchResult(null)
    }
  }

  return (
    <section className="search-filter">
      <header>
        <button onClick={setSelected}>Has attachment</button>
        <button onClick={setSelected}>Last 7 days</button>
        <button onClick={setSelected}>From me</button>
      </header>
      {searchResult && <SearchPreview searchResult={searchResult} />}
    </section>
  )
}
