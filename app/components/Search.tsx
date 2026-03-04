"use client";
import { useState } from "react";
import Image from "next/image";

export default function Search({
  value,
  onChange,
  suggestions,
  onSelect,
  loading,
}: {
  value: string;
  onChange: (city: string) => void;
  suggestions: any[];
  onSelect: (city: any) => void;
  loading: boolean;
}) {
  const [city, setCity] = useState(value);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      onSelect(suggestions[0]); // fallback to first suggestion if user submits without selecting
    }
    // setCity("");
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="search-input-wrapper ">
          <img
            src="/images/icon-search.svg"
            alt="Search Icon"
            width={16}
            height={16}
          />
          <input
            type="text"
            placeholder="Search for a place..."
            id="city-input"
            className="search-input"
            autoComplete="off"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              onChange(e.target.value);
            }}
          />
          {suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion" onClick={() => { onSelect(suggestion); setCity(""); }}>
                  {suggestion.name}, {suggestion.country}, {suggestion.admin1}
                </li>
              ))}
            </ul>
          ) : 
           loading && (
           <div className="suggestions-list flex-row items-center gap-2">
              <Image className="animate-spin" src="/images/icon-loading.svg" alt="icon loading" width={15} height={15} />
              Search in progress
              </div>
            )   
          }
          
        </div>
        <button id="search-button" type="submit" className="btn-primary search-button">
          Search
        </button>
      </form>
    </div>
  );
}
