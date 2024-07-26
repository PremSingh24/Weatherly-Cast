import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AirIcon from "@mui/icons-material/Air";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import { Divider } from "@mui/material";

const MiniCard = ({ iconString, time, temp }) => {
  const Icon = () => {
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
            <div
              style={{
                alignItems: "center",
                marginTop: -12,
              }}
            >
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
        return <WbCloudyIcon sx={{ fontSize: "4rem", color: "grey" }} />;
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
      } else {
        return <Typography>{iconString}</Typography>;
      }
    }
  };
  return (
    <Card
      sx={{
        width: "10rem",
        height: "10rem",
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
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color={"white"}
          fontSize={"large"}
          fontWeight={"bold"}
          sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          {
            new Date(time)
              .toLocaleTimeString("en", { weekday: "long" })
              .split(" ")[0]
          }
        </Typography>
        <Divider
          color="white"
          sx={{ height: "1px", width: "100%", marginBottom: 1 }}
        />
        <Icon />
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
          color="white"
        >
          {temp} &deg;C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MiniCard;
