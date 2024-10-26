// Profile.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

interface ProfileProps {
  name: string;
  imageUrl: string;
  onViewProfile: () => void;
  LogoutButton: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  imageUrl,
  onViewProfile,
  LogoutButton,
}) => {
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
        sx={{ mt: "45px" }} // Adjust the dropdown position
      >
        <MenuItem
          onClick={() => {
            onViewProfile();
            handleClose();
          }}
        >
          View Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>{LogoutButton}</MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
