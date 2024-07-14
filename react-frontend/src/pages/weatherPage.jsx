import { useEffect } from "react";
import { WeatherCard, MiniCard, WeatherChart } from "../components";
import getWeather from "../api/getWeather";
import { useWeatherContext } from "../context/weather";
import { Box } from "@mui/material";

const WeatherPage = () => {
  const { setWeather, setLocation, weather } = useWeatherContext();
  // useEffect(() => {
  //   (async () => {
  //     const latitude = localStorage.getItem("longitude")
  //       ? Number(localStorage.getItem("longitude"))
  //       : 77.216666666;
  //     const longitude = localStorage.getItem("latitude")
  //       ? Number(localStorage.getItem("latitude"))
  //       : 28.666666666;

  //     const location = localStorage.getItem("location")
  //       ? localStorage.getItem("location")
  //       : "Delhi, India";
  //     const weatherResult = await getWeather(latitude, longitude);

  //     setLocation(location);

  //     setWeather(weatherResult.values);
  //   })();
  // }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "4rem",
          paddingTop: "8rem",
          position: "relative",
        }}
      >
        <WeatherCard />

        {weather?.length > 1 ? (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {weather.slice(1, 7).map((curr) => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          mt: "5rem",
          position: "relative",
        }}
      >
        <WeatherChart />
      </Box>
    </>
  );
};

export default WeatherPage;
