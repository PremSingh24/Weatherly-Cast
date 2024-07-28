import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Divider, IconButton, List, ListItem } from "@mui/material";
import React, { useRef, useState } from "react";
import useDebounceSearch from "../hooks/debounceSearch";
import getCityNames from "../api/getCityNames";
import { useEffect } from "react";
import getWeather from "../api/getWeather";
import { useWeatherContext } from "../context/weather";
import { useNavigate } from "react-router-dom";
import loginStatus from "../utils/loginStatus";
import StarButton from "./starButton";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: "80%",
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

  const loggedIn = loginStatus();
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
    const weatherResult = await getWeather(`${city.city},${city.country}`);

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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItem
                      id={`list-item-${index}`}
                      tabIndex={focusedIndex === index ? 0 : -1}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor:
                          focusedIndex === index ? "gray" : "inherit",
                        ":hover": { backgroundColor: "gray" },
                      }}
                      onClick={async () => {
                        const weatherResult = await getWeather(
                          `${city.city},
                          ${city.country}`
                        );

                        setLocation(`${city.city}, ${city.country}`);
                        setWeather(weatherResult.values);

                        localStorage.setItem(
                          "location",
                          `${city.city}, ${city.country}`
                        );

                        setSearchInput("");
                      }}
                    >
                      <Typography variant="body2" color={"black"}>
                        {`${city.city}, ${city.country}`}
                      </Typography>
                    </ListItem>
                    <StarButton
                      city={`${city.city}, ${city.country}`}
                      setSearchInput={setSearchInput}
                    />
                  </div>

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

export default SearchBox;
