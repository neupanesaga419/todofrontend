import { Box, Typography, Button } from "@mui/material";
import React from "react";

export const HeroContent: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 50px",
        minHeight: "100vh",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          zIndex: 3,
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            borderRadius: "30px",
            padding: "12px 40px",
            ":hover": { backgroundColor: "#45a049" },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};
