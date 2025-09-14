export const fetchCityCoordinates = async (text = "") => {
  let url = `https://geocoding-api.open-meteo.com/v1/search?name=${text}`;

  let resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(resp.body);
  }

  let { results = [] } = await resp.json();

  return results;
};
