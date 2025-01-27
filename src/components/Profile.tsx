// Profile.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import LogoutButton from "./login/Logout";

interface ProfileProps {
  name: string;
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" sx={{ position: "relative" }}>
      <IconButton onClick={handleClick} sx={{ padding: 0 }}>
        <Avatar
          alt={name}
          src={imageUrl}
          sx={{
            width: 56,
            height: 56,
            border: "2px solid grey",
            boxShadow: "1px 0px 1px 2px grey",
            backgroundColor: "white",
          }}
        />
      </IconButton>
      <Typography variant="h6" sx={{ marginLeft: "10px", fontWeight: "bold" }}>
        {name}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: "45px",
          "& .MuiPaper-root": {
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            minWidth: "200px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          View Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <LogoutButton />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
