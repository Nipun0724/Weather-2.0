import React from "react";
import "./Cities.css";
const Cities = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      name: "Mumbai",
    },
    {
      id: 2,
      name: "Chennai",
    },
    {
      id: 3,
      name: "Kolkata",
    },
    {
      id: 4,
      name: "Hyderabad",
    },
  ];

  return (
    <div className="maincities">
      {cities.map((city) => (
        <button
          key={city.id}
          className="city-button"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default Cities;
