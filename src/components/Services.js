import { DateTime } from "luxon";
const fetchWeather = async (params) => {
  const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  url.search = new URLSearchParams({
    ...params,
    appid: "c0cede213d495c2f3e4ac6b1a50842d9",
  });
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const formatWeather = (data) => {
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
};
const getData = async (params) => {
  const data = await fetchWeather(params).then(formatWeather);
  return { ...data };
};
const getTime = (secs, zone, format) =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const getCode = (code) => {
  return `http://openweathermap.org./img/wn/${code}@2x.png`;
};
export { getTime, getCode };
export default getData;
