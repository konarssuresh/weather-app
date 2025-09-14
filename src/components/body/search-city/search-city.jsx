import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";

import { Button } from "../../../common-components/button";
import { Popover } from "../../../common-components/popover";
import { SearchInput } from "../../../common-components/search-input/search-input";
import { CityList } from "./city-list";

import { useFetchLocationCorrdinates } from "../../../hooks/useFechLocationCoordinates";
import { useSelectedLocationStore } from "../../../store/location-store";

export const SearchCity = () => {
  const inputRef = useRef(null);
  const [city, setCity] = useState("");
  const { data, isLoading, isError } = useFetchLocationCorrdinates(city);
  const { location, setSelectedCity } = useSelectedLocationStore();

  useEffect(() => {
    if (location !== null) {
      inputRef.current.value = `${location.name}, ${location.admin1}, ${location.country}`;
    } else {
      inputRef.current.value = "";
    }
  }, [location]);

  const handleSearchInputChange = (e) => {
    setCity(e.target.value);
  };

  const debouncedOnChange = debounce(handleSearchInputChange, 300);

  const handleSearch = () => {
    if (!location) {
      return;
    }

    setSelectedCity(location);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <div className="w-full md:w-132">
        <Popover
          className="w-full"
          closeOnClick
          open={
            (inputRef?.current === inputRef.current) === document.activeElement
          }
          placement="bottom-full"
          buttonContent={
            <SearchInput
              ref={inputRef}
              className="w-full md:w-132 text-center"
              placeholder="Search city"
              onChange={debouncedOnChange}
            />
          }
        >
          {city && (
            <>
              {isLoading && <div className="p-2">Loading...</div>}
              {isError && <div className="p-2">Error fetching data</div>}
              {data && data.length === 0 && (
                <div className="p-2">No results found</div>
              )}
              {data && data.length > 0 && <CityList cities={data} />}
            </>
          )}
        </Popover>
      </div>
      <Button className="w-full md:w-fit" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
