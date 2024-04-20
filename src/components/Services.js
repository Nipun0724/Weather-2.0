import { DateTime } from "luxon"; // Importing DateTime class from Luxon library

// Asynchronous function to fetch weather data from OpenWeatherMap API
const fetchWeather = async (params) => {
  const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  // Appending API key and other parameters to the URL
  url.search = new URLSearchParams({
    ...params,
    appid: "c0cede213d495c2f3e4ac6b1a50842d9", // Replace with your API key
  });

  try {
    // Fetching weather data from the API
    const response = await fetch(url);
    const data = await response.json(); // Parsing response as JSON
    // Destructuring necessary weather data from the response
    const {
      wind: { speed },
      coord: { lat, lon },
      sys: { country, sunrise, sunset },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      timezone,
      weather,
    } = data;
    const { main: details, icon } = weather[0];
    // Returning formatted weather data
    return {
      lat,
      lon,
      humidity,
      name,
      dt,
      timezone,
      country,
      sunrise,
      sunset,
      details,
      icon,
      speed,
      temp,
      feels_like,
      temp_min,
      temp_max,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Throwing error if fetching fails
  }
};

// Function to format time using Luxon library
const getTime = (secs, zone, format) =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Function to get URL for weather icon based on code
const getCode = (code) => {
  return `http://openweathermap.org./img/wn/${code}@2x.png`;
};

// Exporting utility functions
export { getTime, getCode };
export default fetchWeather; // Exporting fetchWeather function as default
