import { useQuery } from "@tanstack/react-query";
import { fetchCityCoordinates } from "../service/geolocation-service";

export const useFetchLocationCorrdinates = (key = "") => {
  const queryData = useQuery({
    queryKey: ["fetch-coordinates", key],
    queryFn: () => fetchCityCoordinates(key),
    enabled: Boolean(key),
  });

  return queryData;
};
