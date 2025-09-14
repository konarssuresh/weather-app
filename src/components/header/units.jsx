import { Popover } from "../../common-components/popover";
import IconUnits from "../../common-components/icons/IconUnits";
import IconDropdown from "../../common-components/icons/IconDropdown";
import { SelectorButton } from "../../common-components/selector-button";
import { useUnitsStore, UNITS_STORE_VAL } from "../../store/units-store";

const Section = ({ title, sections }) => {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-preset-8">{title}</h5>
      <div>
        {sections?.map((item) => {
          return (
            <SelectorButton
              key={item.label}
              isSelected={item.isSelected}
              onClick={item.onClick}
            >
              {item.label}
            </SelectorButton>
          );
        })}
      </div>
    </div>
  );
};

export const Units = () => {
  const {
    units,
    temperature,
    windspeed,
    precipitation,
    switchUnits,
    setCelcius,
    setFahrenheit,
    setKmh,
    setMph,
    setMm,
    setInches,
  } = useUnitsStore();

  return (
    <Popover
      buttonContent={
        <div className="flex flex-row items-center px-4 py-3 bg-neutral-800 gap-x-2 rounded-lg cursor-pointer">
          <IconUnits /> <span>Units</span>
          <IconDropdown />
        </div>
      }
      placement="bottom-right"
    >
      <div className="flex flex-col gap-4">
        <button
          onClick={switchUnits}
          className="text-preset-7 cursor-pointer text-left"
        >
          Switch to {units === UNITS_STORE_VAL.METRIC ? "Imperial" : "Metric"}
        </button>
        <Section
          title="Temperature"
          sections={[
            {
              label: "Celsius (°C)",
              isSelected: temperature === UNITS_STORE_VAL.CELCIUS,
              onClick: setCelcius,
            },
            {
              label: "Fahrenheit (°F)",
              isSelected: temperature === UNITS_STORE_VAL.FAHRENHEIT,
              onClick: setFahrenheit,
            },
          ]}
        />
        <Section
          title="Wind Speed"
          sections={[
            {
              label: "km/h",
              isSelected: windspeed === UNITS_STORE_VAL.KMH,
              onClick: setKmh,
            },
            {
              label: "mph",
              isSelected: windspeed === UNITS_STORE_VAL.MPH,
              onClick: setMph,
            },
          ]}
        />
        <Section
          title="Precipitation"
          sections={[
            {
              label: "Millimeters (mm)",
              isSelected: precipitation === UNITS_STORE_VAL.MM,
              onClick: setMm,
            },
            {
              label: "Inches (in)",
              isSelected: precipitation === UNITS_STORE_VAL.INCHES,
              onClick: setInches,
            },
          ]}
        />
      </div>
    </Popover>
  );
};
