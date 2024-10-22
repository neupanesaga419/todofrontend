import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { isLoggedIn } from "./utils/apiUtils"; // Utility to check login status
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI spinner

import "@fontsource/playfair-display/700.css"; // Regular weight
import "@fontsource/poppins/500.css"; // Regular weight
import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true); // Loading state

  // Effect to check login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulate an async operation (like an API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false); // Set loading to false after checking
    };

    checkLoginStatus();
  }, []);

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

  const loggedIn = isLoggedIn(); // Check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Conditional route handling based on login status */}
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
