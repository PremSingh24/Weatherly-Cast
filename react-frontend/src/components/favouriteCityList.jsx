import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useCityContext } from "../context/city";
import StarButton from "./starButton";
import { IconButton, Typography } from "@mui/material";
import { useWeatherContext } from "../context/weather";
import StarsIcon from "@mui/icons-material/Stars";
import { useState } from "react";
import getWeather from "../api/getWeather";
import { useToastContext } from "../context/toast";

const FavouriteCityList = ({ setLoading }) => {
  const [openList, setOpenList] = useState(false);
  const { favCity } = useCityContext();

  const { setLocation, setWeather } = useWeatherContext();
  const { setOpen, setSeverity, setMessage } = useToastContext();

  const toggleDrawer = (newOpen) => () => {
    setOpenList(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
      role="presentation"
    >
      <Typography variant="h5" gutterBottom>
        Fav City
      </Typography>
      {favCity.length > 0 ? (
        <List
          disablePadding
          sx={{
            width: "250px",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {favCity.map((city) => (
            <div key={city}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <ListItem
                  sx={{
                    ":hover": { backgroundColor: "gray" },
                  }}
                  onClick={async () => {
                    setLoading(true);
                    const weatherResult = await getWeather(city);
                    setLoading(false);

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
                      setLocation(city);
                      setWeather(weatherResult.values);
                    }

                    setOpenList(false);

                    localStorage.setItem("location", city);
                  }}
                >
                  <Typography variant="body2" color="#ffffff">
                    {city}
                  </Typography>
                </ListItem>
                <StarButton city={city} />
              </div>

              <Divider color="#ffffff" sx={{ width: "100%" }} />
            </div>
          ))}
        </List>
      ) : (
        <Typography variant="h5" padding={"40px"} color="#ffffff">
          No City Found
        </Typography>
      )}
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ paddingTop: 0.3 }}
        onClick={toggleDrawer(true)}
      >
        <StarsIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <Drawer
        open={openList}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#333333", // Dark panel
            color: "#ffffff", // Light text color for contrast
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default FavouriteCityList;
