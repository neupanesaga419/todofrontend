import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import backgroundImage from "../../assets/todo-background-login.jpg"; // Ensure this is the correct path

export const LoginBackground: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh", // Set to 100vh to cover the full viewport height
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensures the image covers the full area
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        zIndex: -1,
        opacity: isMobile ? 0.9 : 0.8, // Adjust the opacity for a glassmorphism effect
      }}
    />
  );
};
