import { useEffect, useState } from 'react'
import { mailService } from '../services/mail.service'
import { SearchPreview } from './SearchPreview'

export function SearchFilter({ searchValue, mails,setIsSearchFilterOpen }) {
  const [searchResult, setSearchResult] = useState(null)
  const [buttonFilter,setButtonFilter] =useState({
    attachment:false,
    sevenDaysAgo:false,
    fromMe:false
  })
  function setSelected(e) {
    e.target.classList.toggle('selected')
    if(e.target.id){
      switch(e.target.id){
        case 'seven':
          setButtonFilter(prev=>({...prev,sevenDaysAgo:!prev.sevenDaysAgo}))
          break
        case 'me':
          setButtonFilter(prev=>({...prev,fromMe:!prev.fromMe}))
      }
    }
  }
  useEffect(() => {
    getMails()
  }, [searchValue,buttonFilter])

  function getMails() {
    if (searchValue.length) {
      const data = mailService.searchFounder(mails, searchValue,buttonFilter, 1, 5)
      setSearchResult(data)
    } else {
      setSearchResult(null)
    }
  }

  return (
    <section className="search-filter">
      <header>
        {/* <button onClick={setSelected} id='attachment' >Has attachment</button> */}
        <button onClick={setSelected} id='seven'>Last 7 days</button>
        <button onClick={setSelected} id='me'>From me</button>
      </header>
      {searchResult && <SearchPreview searchResult={searchResult} setIsSearchFilterOpen={setIsSearchFilterOpen}/>}
    </section>
  )
}
