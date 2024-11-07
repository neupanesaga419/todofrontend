import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
  Alert,
  styled,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { useLocation, Link } from "react-router-dom";
import { verifyOtp, resendOtp } from "../utils/createAccount";

// Styled components using MUI v5 syntax
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    textAlign: "center",
    width: "48px",
    height: "48px",
    padding: 0,
    fontSize: "1.5rem",
    "@media (max-width: 600px)": {
      width: "40px",
      height: "40px",
      fontSize: "1.25rem",
    },
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused": {
      "& fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
}));

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const theme = useTheme();
  const location = useLocation();
  const [showLoginLink, setShowLoginLink] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Show success message if it exists in location state
    console.log(location.state, "From Location State");
    if (location.state?.message) {
      console.log(location.state, "From Location State if cases");
      toast.success(location.state.message);
    }
  }, []);

  const handleChange = (
    element: HTMLInputElement | HTMLTextAreaElement,
    index: number
  ) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a complete OTP");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const username = localStorage.getItem("username");
      if (!username) {
        setError("Username not found");
        return;
      }
      const response = await verifyOtp({ username: username, otp: otpString });
      if (response.message) {
        setIsVerified(true);
        setShowLoginLink(true);
        setError(response.message);
      }
    } catch (err: any) {
      // Handle error response with specific fields
      if (err.response?.data) {
        setError(err.response.data.error || "Failed to verify OTP");
      } else {
        setError(err instanceof Error ? err.message : "Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      const username = localStorage.getItem("username");
      if (!username) {
        setError("Username not found");
        return;
      }
      const response = await resendOtp({ username: username });
      setError(response.message || "OTP has been resent successfully");
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
            Verify OTP
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Please enter the verification code sent to your device
          </Typography>

          {error && (
            <Alert
              severity={
                error.includes("success") || error.includes("verified")
                  ? "success"
                  : "error"
              }
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
              {showLoginLink && (
                <Button
                  component={Link}
                  to="/"
                  sx={{ display: "block", mt: 1 }}
                >
                  Go to Login
                </Button>
              )}
            </Alert>
          )}

          {!isVerified && (
            <>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                  mb: 3,
                  justifyContent: "center",
                }}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <StyledTextField
                    key={index}
                    inputRef={(ref) => (inputRefs.current[index] = ref)}
                    variant="outlined"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    InputProps={{
                      inputProps: {
                        maxLength: 1,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      },
                    }}
                    autoComplete="off"
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleVerify}
                disabled={loading}
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Verify"}
              </Button>

              <Button
                color="primary"
                onClick={handleResendOtp}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Resend Code
              </Button>
            </>
          )}
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default VerifyOtp;
