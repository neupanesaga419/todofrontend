import { Box } from "@mui/material";
import React from "react";

export const HeroBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(to bottom right, #02AABD,#00CDAC)",
        opacity: 0.5,
        zIndex: 0,
      }}
    />
  );
};
