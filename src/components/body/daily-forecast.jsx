import { useSelectedLocationStore } from "../../store/location-store";
import { useUnitsStore, UNITS_STORE_VAL } from "../../store/units-store";
import { useFetchDailyForecastQuery } from "../../hooks/useFetchForecastQuery";
import { Weather } from "../../common-components/weather";
import { celsiusToFahrenheit } from "../../utils/utils";

const ForeCast = ({ data, isLoading }) => {
  const { temperature: units } = useUnitsStore();
  const { day, minTemp, maxTemp, weatherType } = data;

  const getTemperature = (temp) => {
    if (units === UNITS_STORE_VAL.FAHRENHEIT) {
      return `${celsiusToFahrenheit(temp)}°`;
    }
    return `${temp}°`;
  };

  const forecastContent = (
    <>
      <h6 className="text-preset-6">{day}</h6>
      <Weather weatherType={weatherType} className="w-15 h-15" />
      <div className="w-full flex flex-row justify-between items-center">
        <span className="text-preset-7">{getTemperature(maxTemp)}</span>
        <span className="text-preset-7 text-neutral-200">
          {getTemperature(minTemp)}
        </span>
      </div>
    </>
  );

  return (
    <div
      className={`flex flex-col gap-4 py-4 px-2.5 justify-center items-center bg-neutral-800 rounded-lg min-h-40`}
    >
      {!isLoading ? forecastContent : null}
    </div>
  );
};

export const DailyForeCast = () => {
  const { selectedCity } = useSelectedLocationStore();
  const { data = [], isLoading } = useFetchDailyForecastQuery({
    location: selectedCity,
  });

  let formattedData = isLoading ? Array(7).fill("1") : data;

  return (
    <div className="flex flex-col gap-5">
      <h5 className="text-preset-5">Daily forecast</h5>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {formattedData?.map((d, i) => (
          <ForeCast data={d} key={i} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};
