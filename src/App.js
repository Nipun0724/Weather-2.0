import React, { useEffect, useState } from "react";
// Importing components
// import Cities from "./components/Cities"; // Assuming this component is not used for now
import Search from "./components/Search";
import Result from "./components/Result";
import fetchWeather from "./components/Services"; // Importing fetchWeather utility function

function App() {
  // State variables
  const [query, setQuery] = useState({ q: "vellore" }); // Initial query state for Vellore
  const [units, setUnits] = useState("metric"); // Initial units state (metric by default)
  const [weather, setWeather] = useState(null); // State to store weather data

  // Function to determine background based on weather condition
  function backgroundHandler() {
    if (!weather) {
      return "sunny"; // Default background if weather data is not available
    } else {
      if (units === "metric") {
        if (weather.temp <= 30) {
          return "cold"; // Change background to cold if temperature is less than or equal to 30°C
        } else {
          return "sunny"; // Otherwise, use sunny background
        }
      } else {
        if (weather.temp <= 86) {
          return "cold"; // Change background to cold if temperature is less than or equal to 86°F
        } else {
          return "sunny"; // Otherwise, use sunny background
        }
      }
    }
  }

  // Effect hook to fetch weather data when query or units change
  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather({ ...query, units }); // Fetch weather data based on query and units
        setWeather(data); // Update weather state with fetched data
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getWeather();
  }, [query, units]); // Dependency array to trigger effect when query or units change

  // JSX returned by the component
  return (
    <div className={`${backgroundHandler()}`}>
      {" "}
      {/* Apply background based on weather condition */}
      {/* Render Search component */}
      {weather && (
        <div>
          <Search
            setQuery={setQuery}
            setUnits={setUnits}
            units={units}
            weather={weather}
          />
        </div>
      )}
      {/* Render Result component */}
      {weather && (
        <div>
          <Result weather={weather} />
        </div>
      )}
    </div>
  );
}

export default App;
