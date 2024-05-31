import { CiSearch } from "react-icons/ci";

export function Header({ searchByName, mail }) {
        const _handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                searchByName(e.target.value);
            }
        }
        return (
            <div className="header">
                <label htmlFor="search-input" className="custom-search">
                    <label htmlFor="search-input"><CiSearch /></label>
                    <input type="search" id="search-input" onKeyDown={_handleKeyDown} />
                </label>
            </div>
        )
    
}