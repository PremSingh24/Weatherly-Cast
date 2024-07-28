import { WeatherCard, MiniCard, WeatherChart } from "../components";
import { useWeatherContext } from "../context/weather";
import { Box } from "@mui/material";

const WeatherPage = () => {
  const { weather } = useWeatherContext();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: "4rem",
          paddingTop: "8rem",
          position: "relative",
        }}
      >
        <WeatherCard />

        {weather?.length > 1 ? (
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
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
          </Box>
        ) : null}
      </Box>
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
