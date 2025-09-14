import { useSelectedLocationStore } from "../../../store/location-store";

export const CityList = ({ cities }) => {
  const { setLocation } = useSelectedLocationStore();
  return (
    <div className="flex flex-col gap-2.2">
      {cities.map((city) => {
        return (
          <div
            key={city.id}
            className="py-2 px-2 hover:bg-neutral-600 cursor-pointer"
            onClick={() => setLocation(city)}
          >
            {city.name}, {city.admin1}, {city.country}
          </div>
        );
      })}
    </div>
  );
};
