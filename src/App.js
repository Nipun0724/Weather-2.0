import React, { useEffect, useState } from "react";
// import Cities from "./components/Cities";
import Search from "./components/Search";
import Result from "./components/Result";
import fetchWeather from "./components/Services";
function App() {
  const [query, setQuery] = useState({ q: "vellore" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  function backgroundHandler() {
    if (!weather) {
      return "sunny";
    } else {
      if (units === "metric") {
        if (weather.temp <= 30) {
          return "cold";
        } else {
          return "sunny";
        }
      } else {
        if (weather.temp <= 86) {
          return "cold";
        } else {
          return "sunny";
        }
      }
    }
  }
  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather({ ...query, units });
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getWeather();
  }, [query, units]);

  return (
    <div className={`${backgroundHandler()}`}>
      {/* <Cities setQuery={setQuery} /> */}
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
      {weather && (
        <div>
          <Result weather={weather} units={units} />
        </div>
      )}
    </div>
  );
}

export default App;
