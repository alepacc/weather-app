'use client';

import { useState } from "react";

export default function Search() {
    const [city, setCity] = useState("");
    const [data, setData] = useState<any>(null);

    const handleSearch = async () => {
        const res = await fetch(`/api/weather?city=${city}`);
        const result = await res.json();
        setData(result);
        console.log(result);
    };

    return(
        <div className="search-container">
            <div className="search-input-wrapper ">
                <img src="/images/icon-search.svg" alt="Search Icon" width={16} height={16} />
                <input type="text" placeholder="Search for a place..." id="city-input" className="search-input" autoComplete="off" 
                value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>  
            <button id="search-button" className="btn-primary" onClick={handleSearch}>Search</button> 
        </div>
          
    )
    
}