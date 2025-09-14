import { useState, useEffect, useMemo } from "react";
import { groupBy, get } from "lodash";
import { useSelectedLocationStore } from "../../store/location-store";
import { useFetchHourlyForecastQuery } from "../../hooks/useFetchForecastQuery";
import { useUnitsStore, UNITS_STORE_VAL } from "../../store/units-store";
import { Popover } from "../../common-components/popover";
import { SelectorButton } from "../../common-components/selector-button";
import IconDropdown from "../../common-components/icons/IconDropdown";
import { Weather } from "../../common-components/weather";
import { celsiusToFahrenheit } from "../../utils/utils";

const Forecast = ({ data, isLoading }) => {
  const { temperature: units } = useUnitsStore();

  const getTemperature = (temp) => {
    if (units === UNITS_STORE_VAL.FAHRENHEIT) {
      return `${celsiusToFahrenheit(temp)}°`;
    }
    return `${temp}°`;
  };
  const forecastContent = (
    <>
      <Weather weatherType={data.weatherType} className="w-10 h-10" />
      <span className="grow text-preset-5">{data.hour}</span>
      <span className="text-preset-7">{getTemperature(data.temperature)}</span>
    </>
  );
  return (
    <div className="flex flex-row justify-center items-center min-h-15 rounded-lg bg-neutral-600 gap-2 px-3 py-2.5">
      {isLoading ? null : forecastContent}
    </div>
  );
};
export const HourlyForeCast = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const { selectedCity } = useSelectedLocationStore();
  const { data, isLoading } = useFetchHourlyForecastQuery({
    location: selectedCity,
  });

  useEffect(() => {
    if (data?.length > 0) {
      setSelectedDay(data[0].day);
    }
  }, [data]);

  const displayData = useMemo(() => {
    return groupBy(data, (d) => d.day);
  }, [data]);

  const selectedData = get(displayData, selectedDay, []);

  let formattedData = isLoading ? Array(24).fill(1) : selectedData;

  return (
    <div className="flex flex-col gap-4 p-6 bg-neutral-800">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-preset-5">Hourly forecast</h4>
        <Popover
          buttonContent={
            <div className="flex flex-row items-center px-4 py-3 bg-neutral-600 gap-x-2 rounded-lg cursor-pointer">
              <span>{!isLoading ? selectedDay : "-"}</span>
              <IconDropdown />
            </div>
          }
          placement="bottom-right"
        >
          <div className="flex flex-col gap-1">
            {Object.keys(displayData).map((day) => {
              return (
                <SelectorButton
                  key={day}
                  isSelected={day === selectedDay}
                  onClick={() => {
                    setSelectedDay(day);
                  }}
                >
                  {day}
                </SelectorButton>
              );
            })}
          </div>
        </Popover>
      </div>

      {formattedData.map((d, i) => (
        <Forecast key={i} data={d} isLoading={isLoading} />
      ))}
    </div>
  );
};
