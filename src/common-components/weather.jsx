import { WEATHER_CODES } from "../constants/constants";
import IconSunny from "./images/IconSunny";
import IconPartlyCloudy from "./images/IconPartlyCloudy";
import IconOvercast from "./images/IconOvercast";
import IconFog from "./images/IconFog";
import IconDrizzle from "./images/IconDrizzle";
import IconRain from "./images/IconRain";
import IconSnow from "./images/IconSnow";
import IconStorm from "./images/IconStorm";

const weatherIconMap = {
  [WEATHER_CODES.SUNNY]: IconSunny,
  [WEATHER_CODES.PARTLY_CLOUDY]: IconPartlyCloudy,
  [WEATHER_CODES.OVERCAST]: IconOvercast,
  [WEATHER_CODES.FOG]: IconFog,
  [WEATHER_CODES.DRIZZLE]: IconDrizzle,
  [WEATHER_CODES.RAIN]: IconRain,
  [WEATHER_CODES.SNOW]: IconSnow,
  [WEATHER_CODES.STORM]: IconStorm,
};

export const Weather = ({ weatherType, ...props }) => {
  const IconComponent = weatherIconMap[weatherType] || IconSunny;
  return <IconComponent {...props} />;
};
