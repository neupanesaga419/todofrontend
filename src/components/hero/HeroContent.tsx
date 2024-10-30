import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const HeroContent: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "50px 20px" : "100px 50px",
        minHeight: "100vh",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: isMobile ? "20px" : "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          zIndex: 3,
          position: "relative",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#333",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Manage Your Tasks Efficiently
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
          Stay organized with JWT Todo. Secure, efficient, and easy to use.
        </Typography>

        <Link to="/todos">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              borderRadius: "30px",
              padding: isMobile ? "10px 30px" : "12px 40px",
              ":hover": { backgroundColor: "#45a049" },
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
