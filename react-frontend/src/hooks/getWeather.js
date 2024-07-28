import { useEffect } from "react";
import { useWeatherContext } from "../context/weather";
import getWeather from "../api/getWeather";
import { useToastContext } from "../context/toast";

const useGetWeather = () => {
  const { setWeather, setLocation } = useWeatherContext();
  const { setSeverity, setMessage, setOpen } = useToastContext();

  useEffect(() => {
    (async () => {
      const location = localStorage.getItem("location")
        ? localStorage.getItem("location")
        : "Delhi, India";
      const weatherResult = await getWeather(location);

      if (weatherResult?.status) {
        const res = await weatherResult.json();
        setSeverity("error");
        if (res?.message) {
          setMessage(res.message.slice(0, 69));
        } else {
          setMessage("Can not fetch weather at this moment");
        }
        setOpen(true);
      } else {
        setLocation(location);
        setWeather(weatherResult.values);
      }
    })();
  }, []);
};

export default useGetWeather;
