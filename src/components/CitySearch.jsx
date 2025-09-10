import React, { useEffect, useState } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations || []);
  }, [allLocations]);

  const handleInputChanged = (event) => {
  const value = event.target.value;
  const filteredLocations = allLocations ? allLocations.filter((location) => {
    return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
  }) : [];

  setQuery(value);
  setSuggestions(filteredLocations);

  let infoText;

  if (filteredLocations.length === 0) {
    infoText = "City not found. Please try again."
  }
  else {
    infoText = ""
  }
  setInfoAlert(infoText);
};

const handleItemClicked = (event) => {
  const value = event.target.textContent;
  setQuery(value);
  setShowSuggestions(false);
  setCurrentCity(value);
  setInfoAlert("");
};

  return (
    <div id="city-search" className="input-group">
      <div className="input-row">
        <label htmlFor="city-input">Event location:</label>
        <input
          id="city-input"
          type="text"
          className="input-field"
          placeholder="Search for a city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
      </div>
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          ))}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
