import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Paper,
  Popover,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useDebounceSearch from "../hooks/debounceSearch";
import getCityNames from "../api/getCityNames";
import { useEffect } from "react";
import getWeather from "../api/getWeather";
import { useWeatherContext } from "../context/weather";
import { Link, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "300px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceSearch(searchInput, 300);
  const [searchedCities, setSearchedCities] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { setLocation, setWeather } = useWeatherContext();
  const listRef = useRef([]);
  useEffect(() => {
    (async () => {
      const result = await getCityNames(debouncedSearch);
      setSearchedCities(result);
      setFocusedIndex(-1);
    })();
  }, [debouncedSearch]);

  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const listItem = listRef.current.querySelector(
        `#list-item-${focusedIndex}`
      );
      if (listItem) {
        listItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchedCities.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      handleListItemClick(searchedCities[focusedIndex]);
    }
  };

  const handleListItemClick = async (city) => {
    const weatherResult = await getWeather(`${city.city},
                        ${city.country}`);

    setLocation(`${city.city}, ${city.country}`);
    setWeather(weatherResult.values);

    localStorage.setItem("location", `${city.city}, ${city.country}`);

    setSearchInput("");
  };

  return (
    <Search>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          position: "relative",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          id="City Input"
          placeholder="Search City"
          inputProps={{ "aria-label": "search" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* Search Results */}
      {searchInput.trim() !== "" && searchedCities ? (
        <Container
          component="main"
          sx={{
            position: "relative",
            maxHeight: "250px",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {/* Search Results */}
          <List
            ref={listRef}
            disablePadding
            sx={{
              width: "250px",
              alignItems: "center",
            }}
          >
            {searchedCities.length > 0 ? (
              searchedCities.map((city, index) => (
                <div key={city.id}>
                  <ListItem
                    id={`list-item-${index}`}
                    tabIndex={focusedIndex === index ? 0 : -1}
                    sx={{
                      backgroundColor:
                        focusedIndex === index ? "gray" : "inherit",
                      ":hover": { backgroundColor: "gray" },
                    }}
                    onClick={async () => {
                      // const weatherResult = await getWeather(
                      // `${city.city},
                      //   ${city.country}`
                      // );

                      setLocation(`${city.city}, ${city.country}`);
                      //setWeather(weatherResult.values);

                      localStorage.setItem(
                        "location",
                        `${city.city}, ${city.country}`
                      );

                      setSearchInput("");
                    }}
                  >
                    <Typography variant="body2" color={"black"}>
                      {city.city}
                    </Typography>
                    <Typography variant="body2" color={"black"}>
                      , {city.country}
                    </Typography>
                  </ListItem>
                  <Divider sx={{ width: "100%" }} />
                </div>
              ))
            ) : (
              <Typography variant="h5" padding={"40px"}>
                No City Found
              </Typography>
            )}
          </List>
        </Container>
      ) : null}
    </Search>
  );
};

const UserIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const PopoverContent = () => {
    const loggedIn = localStorage.getItem("loggedIn");
    const navigate = useNavigate();

    return (
      <Card
        variant="elevation"
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 3, md: 5 },
          borderRadius: "5%",
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: 3,
        }}
      >
        {loggedIn ? (
          <>
            <Typography>{localStorage.getItem("user")}</Typography>
            <Button variant="contained" color="error">
              LogOut
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
              handleClose();
            }}
          >
            LogIn
          </Button>
        )}
      </Card>
    );
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="open drawer"
        sx={{ paddingTop: 0.5 }}
        onClick={handleClick}
      >
        <AccountCircleIcon sx={{ fontSize: "2rem", color: "#0000CD" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <PopoverContent />
      </Popover>
    </>
  );
};
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          zIndex: 20,
          pt: 2,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            ml: 4.5,
          }}
        >
          <SearchBox />
          <UserIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
