import { weatherCodeMapper } from "../utils/utils";

export const fetchHourlyForcast = async ({ location }) => {
  const { latitude, longitude, timezone } = location;
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&hourly=temperature_2m,apparent_temperature,wind_speed_10m,precipitation,is_day,weather_code`;

  let resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(resp.body);
  }

  let data = await resp.json();

  let dataToSave = [];

  const { time = [], temperature_2m = [], weather_code } = data?.hourly || {};

  for (let i = 0; i < time.length; i++) {
    let timeVal = new Date(time[i]);
    let obj = {
      day: timeVal.toLocaleDateString("en-US", { weekday: "long" }),
      hour: timeVal.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      time: time[i],
      temperature: temperature_2m[i],
      weatherType: weatherCodeMapper(weather_code[i]),
    };

    dataToSave[i] = obj;
  }

  return dataToSave;
};

export const fetchDailyForecast = async ({ location }) => {
  const { latitude, longitude, timezone } = location;
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=temperature_2m_max,temperature_2m_min,weather_code`;

  let resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(resp.body);
  }

  let data = await resp.json();

  let dataToSave = [];
  const {
    time = [],
    temperature_2m_max = [],
    temperature_2m_min = [],
    weather_code = [],
  } = data?.daily || {};

  for (let i = 0; i < time.length; i++) {
    let day = new Date(time[i]);
    day = day.toLocaleDateString("en-US", {
      weekday: "short",
    });
    let obj = {
      day,
      minTemp: temperature_2m_min[i],
      maxTemp: temperature_2m_max[i],
      weatherType: weatherCodeMapper(weather_code[i]),
    };
    dataToSave[i] = obj;
  }

  return dataToSave;
};

export const fetchCurrentWeather = async ({ location }) => {
  const { latitude, longitude, timezone } = location;
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code`;

  let resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(resp.body);
  }
  let data = await resp.json();

  return data;
};
