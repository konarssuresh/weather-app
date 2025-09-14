import { create } from "zustand";

export const useSelectedLocationStore = create((set) => {
  return {
    location: null,
    selectedCity: null,
    setLocation: (location) => set({ location }),
    setSelectedCity: (city) => set({ selectedCity: city }),
  };
});
