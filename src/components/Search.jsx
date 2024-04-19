import React, { useState } from "react";
import { UilSearch, UilLocationPinAlt } from "@iconscout/react-unicons";
import "./Search.css";
const Search = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const locationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    setQuery({ q: city });
  }
  return (
    <div className="inputs-container">
      <div className="search-section">
        <form action="" autoFocus onSubmit={handleSubmit}>
          <input
            value={city}
            placeholder="Search..."
            type="search"
            className="search-input"
            onChange={(e) => setCity(e.currentTarget.value)}
          />
        </form>
        <button className="search-button" onClick={() => setQuery({ q: city })}>
          <UilSearch />
        </button>
        <button className="location-button" onClick={locationHandler}>
          <UilLocationPinAlt />
        </button>
      </div>
      <div className="metrics-section">
        <button
          name="metric"
          className="unit-button"
          onClick={() => setUnits("metric")}
        >
          <span style={{ color: "white" }}>°C</span>
        </button>
        <p className="separator">|</p>
        <button
          name="imperial"
          className="unit-button"
          onClick={() => setUnits("imperial")}
        >
          <span style={{ color: "white" }}>°F</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
