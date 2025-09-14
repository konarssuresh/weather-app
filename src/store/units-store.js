import { create } from "zustand";

export const UNITS_STORE_VAL = {
  METRIC: "metric",
  IMPERIAL: "imperial",
  CELCIUS: "celcius",
  FAHRENHEIT: "fahrenheit",
  KMH: "km/h",
  MPH: "mph",
  MM: "mm",
  INCHES: "inches",
};

export const useUnitsStore = create((set) => {
  return {
    units: UNITS_STORE_VAL.METRIC,
    temperature: UNITS_STORE_VAL.CELCIUS,
    windspeed: UNITS_STORE_VAL.KMH,
    precipitation: UNITS_STORE_VAL.MM,
    switchUnits: () =>
      set((state) => {
        if (state.units === UNITS_STORE_VAL.METRIC) {
          state.temperature = UNITS_STORE_VAL.FAHRENHEIT;
          state.windspeed = UNITS_STORE_VAL.MPH;
          state.precipitation = UNITS_STORE_VAL.INCHES;
          state.units = UNITS_STORE_VAL.IMPERIAL;

          return { ...state };
        }

        state.temperature = UNITS_STORE_VAL.CELCIUS;
        state.windspeed = UNITS_STORE_VAL.KMH;
        state.precipitation = UNITS_STORE_VAL.MM;
        state.units = UNITS_STORE_VAL.METRIC;

        return { ...state };
      }),
    setCelcius: () =>
      set((state) => ({
        ...state,
        temperature: UNITS_STORE_VAL.CELCIUS,
      })),
    setFahrenheit: () =>
      set((state) => ({
        ...state,
        temperature: UNITS_STORE_VAL.FAHRENHEIT,
      })),
    setKmh: () =>
      set((state) => ({
        ...state,
        windspeed: UNITS_STORE_VAL.KMH,
      })),
    setMph: () =>
      set((state) => ({
        ...state,
        windspeed: UNITS_STORE_VAL.MPH,
      })),
    setMm: () =>
      set((state) => ({
        ...state,
        precipitation: UNITS_STORE_VAL.MM,
      })),
    setInches: () =>
      set((state) => ({
        ...state,
        precipitation: UNITS_STORE_VAL.INCHES,
      })),
  };
});
