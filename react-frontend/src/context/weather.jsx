import { useContext, createContext, useState } from "react";
import { dummyWeather } from "../utils/dummyWeather.js";

const weatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(dummyWeather);

  const [location, setLocation] = useState("Delhi, India");

  return (
    <weatherContext.Provider
      value={{
        weather,
        setWeather,
        location,
        setLocation,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(weatherContext);
