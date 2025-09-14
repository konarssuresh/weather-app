import { WEATHER_CODES } from "../constants/constants";

export const weatherCodeMapper = (weatherCode) => {
  if ([0, 1].includes(weatherCode)) {
    return WEATHER_CODES.SUNNY;
  }
  if (weatherCode === 2) {
    return WEATHER_CODES.PARTLY_CLOUDY;
  }
  if (weatherCode === 3) {
    return WEATHER_CODES.OVERCAST;
  }
  if ([45, 48].includes(weatherCode)) {
    return WEATHER_CODES.FOG;
  }
  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return WEATHER_CODES.DRIZZLE;
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return WEATHER_CODES.RAIN;
  }
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return WEATHER_CODES.SNOW;
  }
  if ([95, 96, 99].includes(weatherCode)) {
    return WEATHER_CODES.STORM;
  }
  // Default fallback
  return WEATHER_CODES.SUNNY;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
};

export const kmhToMph = (kmh) => {
  return Math.round(kmh * 0.621371 * 10) / 10;
};

export const mmToInch = (mm) => {
  return Math.round(mm * 0.0393701 * 1000) / 1000;
};
