import React, { useState, useEffect } from "react";
import "./Result.css";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { getTime, getCode } from "./Services";

const Result = ({
  weather: {
    temp,
    temp_min,
    temp_max,
    dt,
    name,
    country,
    timezone,
    icon,
    speed,
    humidity,
    feels_like,
    sunrise,
    sunset,
  },
  units,
}) => {
  const [format, setFormat] = useState(
    "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setFormat("dd LLL yyyy");
      } else {
        setFormat("cccc, dd LLL yyyy' | Local Time: 'hh:mm a");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="time-location-container">
        <p className="time">{getTime(dt, timezone / 60, format)}</p>
      </div>
      <div className="time-location-container">
        <p className="country">{`${name}, ${country}`}</p>
      </div>
      <div className="main-details">
        <img src={getCode(icon)} alt="" className="weather-icon" />
        <p className="temperature">{`${temp.toFixed()}°${
          units === "metric" ? "C" : "F"
        }`}</p>
        <div className="extra-details">
          <div className="detail">
            <UilTemperature size={18} className="icon" />
            Real feel:{" "}
            <span className="value">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="detail">
            <UilTear size={18} className="icon" />
            Humidity: <span className="value">{humidity}%</span>
          </div>
          <div className="detail">
            <UilWind size={18} className="icon" />
            Wind: <span className="value">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="main-conditions">
        <div className="condition">
          <UilSun size={18} />
          Rise:{" "}
          <span className="time">{getTime(sunrise, timezone, "hh:mm a")}</span>
        </div>
        <div className="condition special">
          <UilSunset size={18} />
          Set:{" "}
          <span className="time">{getTime(sunset, timezone, "hh:mm a")}</span>
        </div>
        <div className="condition special">
          <UilArrowUp size={18} />
          High: <span className="time">{`${temp_max.toFixed()}°`}</span>
        </div>
        <div className="condition special">
          <UilArrowDown size={18} />
          Low: <span className="time">{`${temp_min.toFixed()}°`}</span>
        </div>
      </div>
    </>
  );
};

export default Result;
