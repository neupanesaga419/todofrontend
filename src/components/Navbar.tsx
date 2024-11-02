import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { getUserData } from "../utils/auth";
import LogoutButton from "./login/Logout";
import userImage from "../assets/hero-img.png";
import Profile from "./Profile";

interface User {
  data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleViewProfile = () => {
    console.log("View Profile clicked");
  };

  const userName = `${user?.data?.first_name} ${user?.data?.last_name}`;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: isMobile ? "10px 20px" : "20px 50px",
          backdropFilter: "blur(10px)",
          zIndex: 2,
          backgroundColor: "#85FFBD",
          backgroundImage: `linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontFamily: "Playfair Display, serif",
            letterSpacing: "1px",
            fontSize: isMobile ? "1.2rem" : "1.8rem",
          }}
        >
          JWT Todo
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={handleMobileMenuToggle}
            >
              <Box
                sx={{
                  width: 250,
                  padding: "20px",
                  backgroundColor: "#85FFBD",
                  backgroundImage: `linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "60%",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to={"/home"} style={{ textDecoration: "none" }}>
                    <Button
                      fullWidth
                      sx={{
                        color: "#333",
                        fontWeight: "500",
                        padding: "15px",
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                  <Button
                    fullWidth
                    sx={{
                      color: "#333",
                      fontWeight: "500",
                      padding: "15px",
                    }}
                  >
                    About
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      color: "#333",
                      fontWeight: "500",
                      padding: "15px",
                    }}
                  >
                    Feature
                  </Button>
                  <Button
                    fullWidth
                    sx={{
                      color: "#333",
                      fontWeight: "500",
                      padding: "15px",
                    }}
                  >
                    Contact
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: "25px" }}>
            <Link to={"/home"}>
              <Button sx={{ color: "#333", fontWeight: "500" }}>Home</Button>
            </Link>
            <Button sx={{ color: "#333", fontWeight: "500" }}>About</Button>
            <Button sx={{ color: "#333", fontWeight: "500" }}>Feature</Button>
            <Button sx={{ color: "#333", fontWeight: "500" }}>Contact</Button>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          {user ? (
            <Profile
              name={userName ?? ""}
              imageUrl={userImage}
              onViewProfile={handleViewProfile}
              LogoutButton={<LogoutButton />}
            />
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
