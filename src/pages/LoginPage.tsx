import React from "react";
import { Box } from "@mui/material";
import { LoginBackground } from "../components/LoginBackground";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginBackground />
      <LoginForm />
    </Box>
  );
};
