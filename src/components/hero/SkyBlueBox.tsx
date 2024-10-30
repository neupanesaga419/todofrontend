import { Box, useMediaQuery } from "@mui/material";
import React from "react";

export const SkyBlueBox: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: isMobile ? "100%" : "25%",
        height: isMobile ? "100%" : "80%",
        backgroundColor: "rgba(3, 252, 244, 1)",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlapping Rectangles */}
      <Box
        sx={{
          position: "absolute",
          width: "80%",
          height: "40%",
          backgroundColor: "transparent",
          border: "2px solid #f0f2f2",
          zIndex: 2,
          borderRadius: "8px",
          transform: "translateY(-20%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "70%",
          height: "50%",
          backgroundColor: "transparent",
          border: "2px solid #f0f2f2",
          zIndex: 2,
          borderRadius: "8px",
          transform: "translateY(10%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "90%",
          height: "30%",
          backgroundColor: "transparent",
          border: "2px solid #f0f2f2",
          zIndex: 2,
          borderRadius: "8px",
          transform: "translateY(20%)",
        }}
      />
    </Box>
  );
};
