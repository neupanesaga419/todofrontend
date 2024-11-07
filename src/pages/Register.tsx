import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackground } from "../components/login/LoginBackground";
import { createAccount } from "../utils/createAccount";
import { toast, ToastContainer } from "react-toastify";

// Validation schema
const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    password2: z.string(),
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[A-Za-z]+$/, "First name must contain only letters"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createAccount({
        email: data.email,
        password: data.password,
        password2: data.password2,
        first_name: data.first_name,
        last_name: data.last_name,
      });

      if (response?.username) {
        console.log("Response:", response);
        navigate("/verify-otp", {
          replace: true,
          state: {
            message: response.message || "Account created successfully!",
          },
        });
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

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

      <Box
        sx={{
          borderRadius: "20px",
          padding: isMobile ? "20px" : "40px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          height: "auto",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: isMobile ? "20px" : "30px",
            color: "#000",
            textAlign: "center",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Create JWT Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            "& .MuiTextField-root": {
              mb: { xs: 1.5, sm: 2 },
            },
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />

            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Box>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="new-password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="password2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                error={!!errors.password2}
                helperText={errors.password2?.message}
                autoComplete="new-password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: { xs: 2, sm: 3 },
              mb: { xs: 1, sm: 2 },
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 1.5, sm: 2 },
              mb: { xs: 2, sm: 0 },
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <Link
                to="/"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Sign in
              </Link>
            </Box>
            <Box>
              <Link
                to="/reset-email"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Reset Email
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Register;
