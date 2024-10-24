import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema using zod
const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void; // Function to handle form submission
  loading: boolean; // Loading state to show/hide spinner
  error: string | null; // Error state to display login errors
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

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
      {error && (
        <Typography
          variant="body2"
          sx={{
            color: "#ff4d4f",
            marginTop: "20px",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
