import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import { Link } from "react-router-dom";
import { getUserData } from "../utils/auth"; // Assuming you have this function to fetch user data
import LogoutButton from "./login/Logout";
interface User {
  data: { username: string; email: string };
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data after login
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData(); // Make API call to get user data
        setUser(userData); // Assuming userData contains 'username'
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData(); // Call the function to get user data
  }, []);

  return (
    <AppBar position="absolute" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: "20px 50px",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Slight transparency for blend-in
          backdropFilter: "blur(10px)", // Smooth blending with Hero Section
          zIndex: 2, // Ensure the navbar is above the background image
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Playfair Display, serif", // Elegant font for logo
            letterSpacing: "1px", // Adjust spacing for a logo-like appearance
            fontSize: "1.8rem", // Increase font size for prominence
          }}
        >
          JWT Todo
        </Typography>

        <Box sx={{ display: "flex", gap: "25px" }}>
          <Button sx={{ color: "#333", fontWeight: "500" }}>Home</Button>
          <Button sx={{ color: "#333", fontWeight: "500" }}>About</Button>
          <Button sx={{ color: "#333", fontWeight: "500" }}>Feature</Button>
          <Button sx={{ color: "#333", fontWeight: "500" }}>Contact</Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <Link to="/profile" className="navbar-links">
            Profile
          </Link>
          {/* Conditional rendering based on user's login status */}
          {user ? (
            <Box>
              <Typography sx={{ color: "#333", fontWeight: "500" }}>
                Hi, {user?.data?.username}
              </Typography>
              <LogoutButton />
            </Box>
          ) : (
            <Link to="/login" className="navbar-links">
              Login
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
