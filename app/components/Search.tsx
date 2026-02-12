export default function Search() {
    return(
        <div className="search-container">
            <div className="search-input-wrapper ">
                <img src="/images/icon-search.svg" alt="Search Icon" width={16} height={16} />
                <input type="text" placeholder="Search for a place..." id="city-input" className="search-input" autoComplete="off"/>
            </div>  
            <button id="search-button" className="btn-primary">Search</button> 
        </div>
          
    )
    
}