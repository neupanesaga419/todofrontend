import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, getUserData } from "../utils/auth"; // Assuming these functions are defined in auth.ts

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState<boolean>(false); // To manage loading state
  const [loginError, setLoginError] = useState<string | null>(null); // To manage login errors
  const navigate = useNavigate();

  // Form submit handler
  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true); // Show the spinner
    setLoginError(null); // Reset any previous error

    try {
      // Call the login function and store the tokens
      const logged = await login(data.email, data.password);

      if (logged) {
        // Once logged in, call the API to check if token is valid
        const userData = await getUserData();

        if (userData) {
          navigate("/"); // Redirect to the home page on successful login
        }
      }
    } catch (error) {
      console.error("Login or token validation failed:", error);
      setLoginError(
        "Login failed or session expired. Please check your credentials."
      );
    } finally {
      setLoading(false); // Hide the spinner after login attempt
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        padding: "40px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        height: "450px",
        width: "100%",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#000",
          textAlign: "center",
          fontFamily: "Playfair Display, serif",
        }}
      >
        JWT Todo Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            sx={{
              marginBottom: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "10px",
            }}
          />
          {errors.email && (
            <Typography
              variant="body2"
              sx={{
                color: "#ff4d4f",
                marginBottom: "20px",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              {errors.email.message}
            </Typography>
          )}

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            sx={{
              marginBottom: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "10px",
            }}
          />
          {errors.password && (
            <Typography
              variant="body2"
              sx={{
                color: "#ff4d4f",
                marginBottom: "20px",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              {errors.password.message}
            </Typography>
          )}

          {/* Loading spinner */}
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#39a38c",
                color: "#fff",
                padding: "10px 0",
                fontWeight: "bold",
                borderRadius: "20px",
                ":hover": { backgroundColor: "#45a049" },
                width: "50%",
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </form>

      {/* Error message display */}
      {loginError && (
        <Typography
          variant="body2"
          sx={{
            color: "#ff4d4f",
            marginTop: "20px",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          {loginError}
        </Typography>
      )}

      <Box sx={{ marginTop: "20px" }}>
        <Typography>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
};
