import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";

import { resendOtp } from "../utils/createAccount";
import { Link, useNavigate } from "react-router-dom";

const ResetEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const theme = useTheme();

  const navigate = useNavigate();

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const username = email;
      if (!username) {
        setError("Username not found");
        return;
      }
      const response = await resendOtp({ username: username });
      setSuccess(response.message || "OTP has been resent successfully");
      localStorage.setItem("username", email);
      navigate("/verify-otp");
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.error || "Failed to resend OTP");
      } else {
        setError(err instanceof Error ? err.message : "Failed to resend OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Reset Email OTP
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Please enter your Registered Email For Sending OTP
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert
              severity={"error"}
              sx={{
                mb: 2,
                width: "100%",
                "& .MuiAlert-message": {
                  width: "100%",
                  textAlign: "center",
                },
              }}
            >
              {error}
            </Alert>
          )}
          <>
            <Box
              sx={{
                display: "block",
                mb: 3,
                width: "80%",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleSendOtp}
              disabled={loading}
              sx={{
                mb: 2,
                py: 1.5,
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <Link to="/">
                <Button variant="text">Back to Login</Button>
              </Link>
            </Box>
          </>
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default ResetEmail;
