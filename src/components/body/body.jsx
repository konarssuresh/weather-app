import { Fragment } from "react";
import { SearchCity } from "./search-city/search-city";
import { Hero } from "./hero";
import { DailyForeCast } from "./daily-forecast";
import { HourlyForeCast } from "./hourly-forecast";
import { useSelectedLocationStore } from "../../store/location-store";

export const Body = () => {
  const { selectedCity } = useSelectedLocationStore();

  return (
    <Fragment>
      <h2 className="text-preset-2 text-center font-bricolage">
        How's the sky looking today?
      </h2>
      <div className="flex flex-col gap-12">
        <SearchCity />
        {selectedCity && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 min-h-[60vh] md:h-174">
            <div className={`col-span-2`}>
              <div className="flex flex-col gap-12">
                <Hero />
                <DailyForeCast />
              </div>
            </div>
            <div className="h-115 md:h-187 col-span-2 lg:col-span-1 overflow-y-auto rounded-xl">
              <HourlyForeCast />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
