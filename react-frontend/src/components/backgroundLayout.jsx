import { Box } from "@mui/material";
import clear from "../assets/Clear.jpg";
import cloudy from "../assets/Cloudy.jpg";
import fog from "../assets/fog.png";
import rainy from "../assets/Rainy.jpg";
import stormy from "../assets/Stormy.jpg";
import sunny from "../assets/Sunny.jpg";
import snow from "../assets/snow.jpg";
import { useEffect, useState } from "react";
import { useWeatherContext } from "../context/weather";

const BackgroundLayout = ({ children }) => {
  const { weather } = useWeatherContext();
  const [image, setImage] = useState(sunny);

  useEffect(() => {
    if (weather && weather[0]?.conditions) {
      let imageString = weather[0]?.conditions;
      if (imageString.toLowerCase().includes("clear")) {
        setImage(clear);
      } else if (imageString.toLowerCase().includes("sunny")) {
        setImage(sunny);
      } else if (
        imageString.toLowerCase().includes("cloud") ||
        imageString.toLowerCase().includes("overcast")
      ) {
        setImage(cloudy);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(snow);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(fog);
      } else if (
        imageString.toLowerCase().includes("thunder") ||
        imageString.toLowerCase().includes("storm")
      ) {
        setImage(stormy);
      }
    }
  }, [weather]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </Box>
  );
};

export default BackgroundLayout;
