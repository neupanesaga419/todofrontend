import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"; // Import an icon from Material-UI

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    // Redirect to login page or perform any additional actions needed
    window.location.href = "/"; // Example of redirecting
  };

  return (
    <Tooltip title="Logout">
      <IconButton onClick={handleLogout} color="primary">
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
