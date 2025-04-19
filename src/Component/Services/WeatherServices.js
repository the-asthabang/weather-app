import { DateTime } from 'luxon';

const API_KEY = '3ed60efc052d0781c17d915df0dd480e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (endpoint, searchParams) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    
  return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy | 'Local time:' hh:mm a") =>
  DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  console.log("Weather details:", details);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime: formatToLocalTime(dt, timezone),
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (dt, offset, data) => {
  const hourly = data.slice(0, 5).map((f) => ({
    temp: f.main.temp,
    title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
    icon: iconUrlFromCode(f.weather[0].icon),
    date: f.dt_txt,
  }));

  const daily = data
    .filter((f) => f.dt_txt.endsWith('00:00:00'))
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, 'ccc'),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const currentData = await getWeatherData('weather', searchParams);
  const formattedCurrent = formatCurrentWeather(currentData);

  const { dt, lat, lon, timezone } = formattedCurrent;

  const forecastRaw = await getWeatherData('forecast', {
    lat,
    lon,
    units: searchParams.units,
  });

  const formattedForecast = formatForecastWeather(dt, timezone, forecastRaw.list);

  return { ...formattedCurrent, ...formattedForecast };
};

export default getFormattedWeatherData;

    