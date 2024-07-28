import { IconButton } from "@mui/material";
import { useCityContext } from "../context/city";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { addCityService } from "../services/cityServices/addCIty.service";
import { removeCityService } from "../services/cityServices/removeCity.service";
import loginStatus from "../utils/loginStatus";
import { useNavigate } from "react-router-dom";

const StarButton = ({ city, setSearchInput }) => {
  const { favCity, setFavCity } = useCityContext();
  const loggedIn = loginStatus();
  const navigate = useNavigate();

  const addCity = async () => {
    setFavCity([...favCity, city]);
    const response = await addCityService(city);

    if (response?.status) {
      setFavCity(favCity.filter((c) => c !== city));
    }
  };

  const removeCity = async () => {
    setFavCity(favCity.filter((c) => c !== city));
    const response = await removeCityService(city);

    if (response?.status) {
      console.log("here ", response);
      setFavCity([...favCity, city]);
    }
  };

  return favCity.includes(city) ? (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label="open drawer"
      sx={{ paddingTop: 0.5 }}
      onClick={removeCity}
    >
      <StarIcon color="warning" />
    </IconButton>
  ) : (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label="open drawer"
      sx={{ paddingTop: 0.5 }}
      onClick={() => {
        loggedIn ? addCity() : navigate("/login");
        setSearchInput("");
      }}
    >
      <StarBorderIcon />
    </IconButton>
  );
};

export default StarButton;
