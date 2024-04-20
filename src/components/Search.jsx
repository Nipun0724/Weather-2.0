import React, { useState } from "react";
import { getCode } from "./Services";
import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
import "./Search.css";

// Functional component Search receives setQuery and setUnits as props
const Search = ({ weather, units, setQuery, setUnits }) => {
  // State hook to manage the city input field
  const [city, setCity] = useState("");

  // Function to handle fetching location based on user's geolocation
  const locationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // Set the query with latitude and longitude
        setQuery({ lat, lon });
      });
    }
  };

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Set the query with the city value
    setQuery({ q: city });
  }

  // JSX returned by the component
  return (
    <div className="input">
      <div className="inputs-container">
        {/* Search section containing input field and search button */}
        <div className="search-section">
          <form action="" autoFocus onSubmit={handleSubmit}>
            {/* Input field for searching cities */}
            <input
              value={city}
              placeholder="Search..."
              type="search"
              className="search-input"
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </form>
          {/* Button for manual search */}
          <button
            className="search-button"
            onClick={() => setQuery({ q: city })}
          >
            <UilSearch />
          </button>
          {/* Button to fetch location based on geolocation */}
          <button className="location-button" onClick={locationHandler}>
            <UilLocationPinAlt />
          </button>
        </div>
        {/* Metrics section containing unit buttons */}
        <div className="metrics-section">
          {/* Button to switch units to metric */}
          <button
            name="metric"
            className="unit-button"
            onClick={() => setUnits("metric")}
          >
            <span style={{ color: "white" }}>°C</span>
          </button>
          {/* Separator between unit buttons */}
          <p className="separator">|</p>
          {/* Button to switch units to imperial */}
          <button
            name="imperial"
            className="unit-button"
            onClick={() => setUnits("imperial")}
          >
            <span style={{ color: "white" }}>°F</span>
          </button>
        </div>
      </div>
      <div className="temp-icon">
        <img src={getCode(weather.icon)} alt="" className="weather-icon" />
        <p className="temperature">{`${weather.temp.toFixed()}°${
          units === "metric" ? "C" : "F"
        }`}</p>
      </div>
    </div>
  );
};

export default Search;
