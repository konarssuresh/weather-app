import { useQuery } from "@tanstack/react-query";
import {
  fetchHourlyForcast,
  fetchDailyForecast,
  fetchCurrentWeather,
} from "../service/forecast-service";

import { weatherCodeMapper } from "../utils/utils";

export const useFetchHourlyForecastQuery = ({ location }) => {
  const query = useQuery({
    queryKey: ["hourly-forecast", location?.id],
    queryFn: () => fetchHourlyForcast({ location }),
    enabled: Boolean(location?.id),
  });

  return query;
};

export const useFetchDailyForecastQuery = ({ location }) => {
  const query = useQuery({
    queryKey: ["daily-forecast", location?.id],
    queryFn: () => fetchDailyForecast({ location }),
    enabled: Boolean(location?.id),
  });

  return query;
};

export const useFetchCurrentForecastQuery = ({ location }) => {
  const query = useQuery({
    queryKey: ["current-forecast", location?.id],
    queryFn: () => fetchCurrentWeather({ location }),
    enabled: Boolean(location?.id),
    select: (resp) => {
      const data = resp?.current;
      let date = new Date(data?.time);
      date = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return {
        temperature: data?.temperature_2m,
        feelsLike: data?.apparent_temperature,
        humidity: data?.relative_humidity_2m,
        wind: data?.wind_speed_10m,
        precipitation: data?.precipitation,
        date,
        weatherType: weatherCodeMapper(data?.["weather_code"]),
      };
    },
  });

  return query;
};
