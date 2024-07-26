import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDate } from "../hooks/date";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AirIcon from "@mui/icons-material/Air";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { Divider } from "@mui/material";
import { useWeatherContext } from "../context/weather";

const WeatherCard = () => {
  const { weather, location } = useWeatherContext();
  const { time } = useDate();

  const iconString = weather ? weather[0]?.conditions : "clear";

  const WeatherIcon = () => {
    if (iconString) {
      if (iconString.toLowerCase().includes("rain")) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <WbCloudyIcon sx={{ fontSize: "3.5rem", color: "grey" }} />
            <div style={{ alignItems: "center", marginTop: -12 }}>
              <WaterDropIcon
                sx={{
                  fontSize: "1rem",
                  color: "#007aff",
                  transform: "rotate(45deg)",
                }}
              />
              <WaterDropIcon
                sx={{
                  fontSize: "1rem",
                  color: "#007aff",
                  transform: "rotate(45deg)",
                }}
              />
              <WaterDropIcon
                sx={{
                  fontSize: "1rem",
                  color: "#007aff",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
          </div>
        );
      } else if (
        iconString.toLowerCase().includes("cloud") ||
        iconString.toLowerCase().includes("overcast")
      ) {
        return <WbCloudyIcon sx={{ fontSize: "4rem", color: "white" }} />;
      } else if (iconString.toLowerCase().includes("clear")) {
        return <WbSunnyIcon color="warning" sx={{ fontSize: "4rem" }} />;
      } else if (iconString.toLowerCase().includes("thunder")) {
        return <ThunderstormIcon sx={{ fontSize: "4rem", color: "white" }} />;
      } else if (iconString.toLowerCase().includes("fog")) {
        return <LensBlurIcon sx={{ fontSize: "4rem", color: "white" }} />;
      } else if (iconString.toLowerCase().includes("snow")) {
        return <AcUnitIcon sx={{ fontSize: "4rem", color: "#7bb3ff" }} />;
      } else if (iconString.toLowerCase().includes("wind")) {
        return <AirIcon sx={{ fontSize: "4rem", color: "black" }} />;
      }
    }
  };
  return (
    <Card
      sx={{
        width: 300,
        height: "27rem",
        zIndex: 18,
        background: "rgba(255, 255, 255, 0.18)",
        boxShadow: 3,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blue(8px)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        ":hover": { boxShadow: 20 },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <WeatherIcon />
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
            color="white"
          >
            {weather[0]?.temp} &deg;C
          </Typography>
        </div>

        <Typography
          variant="body1"
          color={"white"}
          component="div"
          fontWeight={"bold"}
          align={"center"}
          mt={1}
          mb={3}
          sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          {location}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Typography
            variant="body2"
            color="white"
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            {new Date().toDateString()}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            {time}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#0000ff",
              padding: 4,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "44%",
            }}
          >
            <Typography
              color="white"
              fontSize={"small"}
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              Wind Speed
            </Typography>
            <Typography
              color="white"
              fontSize={"small"}
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {weather[0]?.wspd} km/h
            </Typography>
          </div>
          <div
            style={{
              width: "44%",
              backgroundColor: "#43A047",
              padding: 4,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              color="white"
              fontSize={"small"}
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              Humidity
            </Typography>
            <Typography
              color="white"
              fontSize={"small"}
              sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {weather[0]?.humidity} gm/m&#179;
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            color="white"
            fontSize={"small"}
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            Heat Index
          </Typography>
          <Typography
            color="white"
            fontSize={"small"}
            sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
          >
            {weather[0]?.heatindex ? weather[0].heatindex : "N/A"}
          </Typography>
        </div>
        <Divider color="white" sx={{ height: "1px", mb: 2 }} />
        <Typography
          color={"white"}
          align={"center"}
          fontWeight={"bold"}
          variant="h6"
          sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          {weather[0]?.conditions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
