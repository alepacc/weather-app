'use client';

import { useState } from "react";

export default function Search({onSearch}: { onSearch: (city: string) => void}) {
    const [city, setCity] = useState("");

    const handleSearch = async () => {
        // const res = await fetch(`/api/weather?city=${city}`);
        // const result = await res.json();
        onSearch(city);
        // console.log(result);
    };

    return(
        <div className="search-container">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="search-input-wrapper ">
                    <img src="/images/icon-search.svg" alt="Search Icon" width={16} height={16} />
                    <input type="text" placeholder="Search for a place..." id="city-input" className="search-input" autoComplete="off" 
                    value={city} onChange={(e) => setCity(e.target.value)}/>
                </div>  
                <button id="search-button" type="submit" className="btn-primary">Search</button> 
            </form>    
        </div>
          
    )
    
}