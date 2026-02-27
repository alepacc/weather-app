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

  const handleSearch = async () => {
    onSearch(city);
  };

  return (
    <div className="search-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
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
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => onSelect(suggestion)}>
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        </div>
        <button id="search-button" type="submit" className="btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}
