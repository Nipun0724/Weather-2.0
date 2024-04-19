import React, { useEffect, useState } from "react";
import Cities from "./components/Cities";
import Search from "./components/Search";
import Result from "./components/Result";
import getData from "./components/Services";
function App() {
  const [query, setQuery] = useState({ q: "vellore" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  function backgroundHandler() {
    if (!weather) return "sunny";
    const threshold_temp = units === "metric" ? 30 : 86;
    if (weather.temp <= threshold_temp) return "cold";
    return "sunny";
  }
  useEffect(() => {
    const getWeather = async () => {
      await getData({ ...query, units }).then((data) => setWeather(data));
    };
    getWeather();
  }, [query, units]);
  return (
    <div className={`${backgroundHandler()}`}>
      <Cities setQuery={setQuery} />
      <Search setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <div>
          <Result weather={weather} units={units} />
        </div>
      )}
    </div>
  );
}

export default App;
