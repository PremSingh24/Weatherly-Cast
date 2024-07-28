import { useEffect } from "react";
import { useWeatherContext } from "../context/weather";
import getWeather from "../api/getWeather";

const useGetWeather = () => {
  const { setWeather, setLocation } = useWeatherContext();

  useEffect(() => {
    (async () => {
      const location = localStorage.getItem("location")
        ? localStorage.getItem("location")
        : "Delhi, India";
      const weatherResult = await getWeather(location);

      setLocation(location);

      setWeather(weatherResult.values);
    })();
  }, []);
};

export default useGetWeather;
