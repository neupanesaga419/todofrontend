import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  isLoggedIn,
  getTokenExpiry,
  isRefreshTokenExpired,
} from "./utils/apiUtils";
import { refreshAccessToken } from "./utils/auth";
import { LoginPage } from "./pages/Authentication/LoginPage";
import { Home } from "./pages/Home/Home";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "@fontsource/playfair-display/700.css";
import "@fontsource/poppins/500.css";
import "./App.css";
import TodoList from "./pages/Todo/Todos";
import Register from "./pages/Authentication/Register";
import VerifyOtp from "./pages/Authentication/VerifyOtp";
import ResetEmail from "./pages/Authentication/ResetEmail";
import { ResetPassword } from "./pages/Authentication/ResetPassword";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  // Initial check for login status and token expiry
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await isLoggedIn();
      setLoggedIn(isUserLoggedIn);
      if (isUserLoggedIn) {
        const expiry = await getTokenExpiry();
        setExpiryTime(expiry);
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  // Polling interval to update token expiry periodically
  useEffect(() => {
    const tokenRefreshInterval = setInterval(async () => {
      const isUserLoggedIn = await isLoggedIn();
      setLoggedIn(isUserLoggedIn);

      if (isUserLoggedIn) {
        const expiry = await getTokenExpiry();
        setExpiryTime(expiry);
      } else {
        handleLogout(); // Ensure we handle logout if the user is no longer logged in
      }
    }, 60000); // Poll every 1 minute

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  // Monitor the token expiry time
  useEffect(() => {
    if (expiryTime && loggedIn) {
      const interval = setInterval(() => {
        const timeRemaining = expiryTime - Date.now();

        if (timeRemaining <= 10000 && timeRemaining > 0) {
          setShowCountdown(true);
          setCountdown(Math.floor(timeRemaining / 1000));
        }

        if (timeRemaining <= 0) {
          handleLogout();
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiryTime, loggedIn]);

  // Handle manual logout
  const handleLogout = () => {
    setLoggedIn(false);
    setShowCountdown(false); // Close countdown dialog
    setCountdown(10); // Reset countdown
    setExpiryTime(null); // Reset expiry time
    localStorage.clear(); // Clear all stored tokens
  };

  // Handle "Stay" button click
  const handleStay = async () => {
    const refreshTokenValid = await isRefreshTokenExpired();
    if (!refreshTokenValid) {
      await refreshAccessToken(); // Assume this updates local storage with a new access token
      const newAccessToken = localStorage.getItem("accessToken");
      if (newAccessToken) {
        const newExpiryTime = await getTokenExpiry(); // Get the new expiry time for the refreshed access token
        setExpiryTime(newExpiryTime);
        setShowCountdown(false); // Close the countdown dialog
      } else {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/home"
          element={loggedIn ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/todos"
          element={loggedIn ? <TodoList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={loggedIn ? <Navigate to="/home" replace /> : <Register />}
        />
        <Route
          path="/verify-otp"
          element={loggedIn ? <Navigate to="/home" replace /> : <VerifyOtp />}
        />
        <Route
          path="/reset-email"
          element={loggedIn ? <Navigate to="/home" replace /> : <ResetEmail />}
        />
        <Route
          path="/forgot-password"
          element={
            loggedIn ? <Navigate to="/home" replace /> : <ResetPassword />
          }
        />
      </Routes>

      {/* Countdown Dialog */}
      <Dialog open={loggedIn && showCountdown} onClose={handleLogout}>
        <DialogContent>
          <Typography variant="h6">
            Your session will expire in {countdown} seconds
          </Typography>
          <Typography variant="body2">
            Please save your work. You will be logged out automatically.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
          <Button onClick={handleStay} color="secondary">
            Stay
          </Button>
        </DialogActions>
      </Dialog>
    </Router>
  );
};

export default App;
