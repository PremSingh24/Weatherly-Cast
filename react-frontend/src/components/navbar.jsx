import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Card, IconButton, Popover } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import loginStatus from "../utils/loginStatus";
import { FavouriteCityList, SearchBox } from ".";
import { useCityContext } from "../context/city";

const UserIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const loggedIn = loginStatus();

  const { setFavCity } = useCityContext();

  const handleClick = (event) => {
    if (loggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setFavCity([]);
    handleClose();
  };

  const PopoverContent = () => {
    return (
      <Card
        variant="elevation"
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 3, md: 3 },
          borderRadius: "5%",
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: 3,
        }}
      >
        {loggedIn ? (
          <>
            <Typography gutterBottom fontSize={"1.1rem"} mt={-2}>
              {localStorage.getItem("username")}
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleLogOut}
              sx={{ marginTop: 1 }}
            >
              LogOut
            </Button>
          </>
        ) : null}
      </Card>
    );
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="user details"
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
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <PopoverContent />
      </Popover>
    </>
  );
};
const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
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
            flexDirection: "row",
          }}
        >
          <FavouriteCityList />

          <SearchBox />
          <UserIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
