import React from "react";
import { Typography, Tooltip } from "@mui/material";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    console.log("Logged Out");
    // Redirect to login page or perform any additional actions needed
    window.location.href = "/"; // Example of redirecting
  };

  return (
    <Tooltip title="Logout">
      <Typography
        onClick={handleLogout}
        sx={{ cursor: "pointer", color: "black" }}
      >
        Logout
      </Typography>
    </Tooltip>
  );
};

export default LogoutButton;
