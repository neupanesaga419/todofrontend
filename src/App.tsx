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
  const [loggedIn, setLoggedIn] = useState(false); // Login state

  // Effect to check login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulate an async operation (like an API call)
      setLoggedIn(isLoggedIn());
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

  return (
    <Router>
      <Routes>
        {/* Conditional route handling based on login status */}
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/home" />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/home"
          element={loggedIn ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
