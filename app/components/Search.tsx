"use client";
import { useState } from "react";

export default function Search({
  onSearch,
  value,
  onChange,
  suggestions,
  onSelect,
}: {
  onSearch: (city: string) => void;
  value: string;
  onChange: (city: string) => void;
  suggestions: any[];
  onSelect: (city: any) => void;
}) {
  const [city, setCity] = useState(value);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      onSelect(suggestions[0]); // fallback to first suggestion if user submits without selecting
    }
  };

  return (
    <div className="search-container">
      <form
        onSubmit={handleSearch}
      >
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
              <li key={index} className="suggestion" onClick={() => onSelect(suggestion) }>
                {suggestion.name}, {suggestion.country}, {suggestion.admin1}
              </li>
            ))}
          </ul>
          ) : null}
          
        </div>
        <button id="search-button" type="submit" className="btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}
