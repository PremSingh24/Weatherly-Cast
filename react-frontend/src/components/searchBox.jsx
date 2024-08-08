import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Divider,
  List,
  ListItem,
  Box,
  keyframes,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useDebounceSearch from "../hooks/debounceSearch";
import getCityNames from "../api/getCityNames";
import { useEffect } from "react";
import getWeather from "../api/getWeather";
import { useWeatherContext } from "../context/weather";

import StarButton from "./starButton";
import { useToastContext } from "../context/toast";

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
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Dot = styled(Box)(({ theme }) => ({
  width: 5,
  height: 5,
  borderRadius: "50%",
  backgroundColor: theme.palette.text.primary,
  margin: "0 2px",
  animation: `${blink} 1s infinite`,
}));

const DottedTransition = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
});
const SearchBox = ({ setLoading }) => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounceSearch(searchInput, 300);
  const [searchedCities, setSearchedCities] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { setLocation, setWeather } = useWeatherContext();
  const listRef = useRef([]);

  const { setOpen, setSeverity, setMessage } = useToastContext();

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
    setSearchInput("");
    setLoading(true);
    const weatherResult = await getWeather(`${city.city},${city.country}`);
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
      setLocation(`${city.city}, ${city.country}`);
      setWeather(weatherResult.values);
      localStorage.setItem("location", `${city.city}, ${city.country}`);
    }
  };

  return (
    <Search>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
        {searchInput.length > 0 && !searchedCities.length ? (
          <DottedTransition>
            <Dot style={{ animationDelay: "0s" }} />
            <Dot style={{ animationDelay: "0.2s" }} />
            <Dot style={{ animationDelay: "0.4s" }} />
          </DottedTransition>
        ) : null}
      </div>
      {/* Search Results */}
      {searchInput.trim() !== "" && searchedCities.length ? (
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
                        setSearchInput("");
                        setLoading(true);
                        const weatherResult = await getWeather(
                          `${city.city},
                          ${city.country}`
                        );
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
                          setLocation(`${city.city}, ${city.country}`);
                          setWeather(weatherResult.values);
                          localStorage.setItem(
                            "location",
                            `${city.city}, ${city.country}`
                          );
                        }
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
