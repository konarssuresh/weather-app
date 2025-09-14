import { useFetchCurrentForecastQuery } from "../../hooks/useFetchForecastQuery";
import { useSelectedLocationStore } from "../../store/location-store";
import { useUnitsStore, UNITS_STORE_VAL } from "../../store/units-store";
import { Weather } from "../../common-components/weather";
import IconsLoading from "../../common-components/icons/IconLoading";
import { celsiusToFahrenheit, mmToInch, kmhToMph } from "../../utils/utils";

const SummaryData = ({ label, value, isLoading }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-5 flex flex-col gap-6">
      <span className="text-preset-6 text-neutral-200">{label}</span>
      <span className="text-preset-4 md:text-preset-3 text-neutral-0">
        {isLoading ? "-" : value}
      </span>
    </div>
  );
};

let bgClasses =
  "bg-cover bg-center bg-[url('/assets/images/bg-today-small.svg')]  sm:bg-[url('/assets/images/bg-today-small.svg')] lg:bg-[url('/assets/images/bg-today-large.svg')]";
export const Hero = () => {
  const {
    temperature: tempUnits,
    windspeed: speedUnits,
    precipitation: precipitationUnits,
  } = useUnitsStore();
  const { selectedCity } = useSelectedLocationStore();
  const { data, isLoading } = useFetchCurrentForecastQuery({
    location: selectedCity,
  });

  const getTemperature = (temp) => {
    if (tempUnits === UNITS_STORE_VAL.FAHRENHEIT) {
      return `${celsiusToFahrenheit(temp)}°`;
    }
    return `${temp}°`;
  };

  const getSpeed = (speed) => {
    if (speedUnits === UNITS_STORE_VAL.MPH) {
      return `${kmhToMph(speed)} mph`;
    }

    return `${speed} km/h`;
  };

  const getLength = (length) => {
    if (precipitationUnits === UNITS_STORE_VAL.INCHES) {
      return `${mmToInch(length)} in`;
    }

    return `${length} mm`;
  };

  const heroContent = (
    <>
      <div className="flex flex-col gap-3">
        <h3 className="text-preset-4 text-center md:text-left">
          {selectedCity?.name}, {selectedCity?.country}
        </h3>
        <h5 className="text-preset-6 text-neutral-200">{data?.date}</h5>
      </div>
      <div className="flex flex-row items-center md:gap-6">
        <Weather
          weatherType={data?.weatherType}
          className="w-20 h-20 md:w-30 md:h-30"
        />
        <h3 className="text-preset-1">{getTemperature(data?.temperature)}</h3>
      </div>
    </>
  );

  const heroLoading = (
    <div className="flex w-full flex-col md:gap-4 justify-center items-center h-36">
      <IconsLoading />
      <span className="text-neutral-200 text-preset-6">Loading...</span>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-8">
        <div
          className={`flex flex-col md:flex-row justify-between items-center space-between w-full py-10 md:py-20 px-6 rounded-2xl ${
            !isLoading ? bgClasses : "bg-neutral-800"
          }`}
        >
          {!isLoading ? heroContent : heroLoading}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <SummaryData
            label="Feels Like"
            value={getTemperature(data?.feelsLike)}
            isLoading={isLoading}
          />
          <SummaryData
            label="Humidity"
            value={`${data?.humidity}%`}
            isLoading={isLoading}
          />
          <SummaryData
            label="Wind"
            value={getSpeed(data?.wind)}
            isLoading={isLoading}
          />
          <SummaryData
            label="Precipitation"
            value={getLength(data?.precipitation)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};
