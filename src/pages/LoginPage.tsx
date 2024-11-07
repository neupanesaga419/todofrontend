import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, getUserData } from "../utils/auth"; // Assuming these functions are defined
import { LoginForm } from "../components/login/LoginForm";
import { LoginBackground } from "../components/login/LoginBackground";

interface LoginPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handler function to deal with form submission and login process
  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true); // Start loading spinner
    setLoginError(null); // Clear any previous error

    try {
      const loggedIn = await login(data.email, data.password); // Call the login function

      if (loggedIn) {
        const userData = await getUserData(); // Fetch user data if login is successful
        if (userData) {
          setLoggedIn(true); // Update the loggedIn state
          navigate("/home"); // Navigate to the home page
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

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
      {/* Pass login handler, loading, and error states to LoginForm */}
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={loginError}
        onForgotPassword={() => {
          navigate("/forgot-password");
        }}
        onSignUp={() => {
          navigate("/register");
        }}
      />
    </Box>
  );
};
