// src/components/NotFoundPage.tsx

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/ErrorBackground.webp"; // replace with your custom image path

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: `url(${notFoundImage}) no-repeat center center`,
        backgroundSize: "cover",
        textAlign: "center",
        color: "white",
        p: 2,
      }}
    >
      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <Button
        variant="outlined"
        component={Link}
        to="/"
        sx={{
          color: "white",
          borderColor: "white",
          "&:hover": { borderColor: "white" },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
