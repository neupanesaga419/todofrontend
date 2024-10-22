import { Box } from "@mui/material";
import React from "react";
import { Navbar } from "./Navbar";
import { HeroBackground } from "./HeroBackground";
import { SkyBlueBox } from "./SkyBlueBox";
import { HeroContent } from "./HeroContent";

export const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <HeroBackground />
      <SkyBlueBox />
      <HeroContent />
    </Box>
  );
};
