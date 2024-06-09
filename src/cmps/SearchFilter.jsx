import { useState } from "react"



export function SearchFilter(){
const [selectedFilters,setSelectedFilters] = useState([])
    function setSelected(e){
        
        e.target.classList.toggle("selected")
      
    }




    return(
        <section className='search-filter'>
           <header>
            <button onClick={setSelected}>Has attachment</button>
            <button onClick={setSelected}>Last 7 days</button>
            <button onClick={setSelected}>From me</button>
           </header>
          </section>
    )
}