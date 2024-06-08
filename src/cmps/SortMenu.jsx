import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { mailService } from '../services/mail.service'
import { useParams, useSearchParams } from 'react-router-dom'

export function SortMenu({ sortMails, sortBy }) {
  const params = useParams()
  const basicSort = ['Starred','Read', 'Date',  'Subject']
 const [sortParams,setSortParams] = useState(basicSort)
 useEffect(()=>{
    loadParams()
 },[params])

  function setSortMails(sortName) {
    if (sortBy.by === sortName.toLowerCase() && sortBy.dir === 1) {
      sortMails({ dir: -1 })
    } else if (sortBy.by === sortName.toLowerCase() && sortBy.dir === -1) {
      sortMails({ dir: 1 })
    } else {
      sortMails({ by: sortName.toLowerCase(), dir: 1 })
    }
  }
function loadParams(){
    
    if(params.folder === "unread"||params.folder === "draft"){
       
        setSortParams(basicSort.filter(sort=>{return sort!="Read"}))
    }else if(params.folder === "starred"){
        setSortParams(basicSort.filter(sort=>{return sort!="Starred"}))
    }else{
        setSortParams(basicSort)
    }
}


  return (
    <section className="flex">
      {sortParams.map((sort) => 
         (
            <button key={sort} onClick={() => setSortMails(sort)}>
              {sort}
              {sortBy.by === sort.toLowerCase() && sortBy.dir === 1 && (
                <IoIosArrowDown />
              )}
              {sortBy.by === sort.toLowerCase() && sortBy.dir === -1 && (
                <IoIosArrowUp />
              )}
            </button>
          )
       
      )}
    </section>
  )
}
