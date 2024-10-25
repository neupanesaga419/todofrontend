import { Box } from "@mui/material";
import React from "react";
import { Navbar } from "./Navbar";
import { HeroBackground } from "./hero/HeroBackground";
import { SkyBlueBox } from "./hero/SkyBlueBox";
import { HeroContent } from "./hero/HeroContent";

export const HomeContents: React.FC = () => {
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
