import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { Email, Visibility, VisibilityOff } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";

import { LoginBackground } from "../../components/login/LoginBackground";
import {
  BASE_URL,
  SEND_RESET_PASSWORD_OTP,
  VERIFY_RESET_PASSWORD_OTP,
} from "../../utils/constant";
import axios from "axios";

const emailSchema = z.object({
  email: z.string().email(),
});

const otpSchema = z
  .object({
    email: z.string().email(),
    otp: z.string().length(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't Match",
    path: ["confirmPassword"],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

const EmailForm = ({
  onSuccess,
  setResponseMessage,
}: {
  onSuccess: (email: string) => void;
  setResponseMessage: (resMessage: string) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: EmailFormData) => {
    console.log("Sending OTP to:", data.email);

    try {
      const response = await axios.post(
        `${BASE_URL}${SEND_RESET_PASSWORD_OTP}`,
        {
          username: data.email,
        }
      );
      if (response.status === 200) {
        setResponseMessage(response.data.message);
        // toast.success(response.data.message);    // Show success toast
        onSuccess(data.email);
      } else if (response.status === 400) {
        setResponseMessage(response.data.error);
        toast.error(response.data.error); // Show error toast
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while sending OTP."); // Show error toast
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Send OTP
      </Button>
    </Box>
  );
};

const OTPForm = ({ email }: { email: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email, otp: "", password: "", confirmPassword: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: OTPFormData) => {
    console.log("Resetting password with data:", data);

    try {
      const response = await axios.post(
        `${BASE_URL}${VERIFY_RESET_PASSWORD_OTP}`,
        {
          username: data.email,
          otp: data.otp,
          password: data.password,
          confirm_password: data.confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message); // Show success toast
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Failed to reset password."); // Show error toast
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while resetting password."); // Show error toast
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="OTP"
            fullWidth
            error={!!errors.otp}
            helperText={errors.otp?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="off"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            autoComplete="off"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Reset Password
      </Button>
    </Box>
  );
};

export const ResetPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (responseMessage) {
      toast.success(responseMessage);
    }
  }, [responseMessage]);

  return (
    <>
      <ToastContainer />
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
            padding: isMobile ? "20px" : "40px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "Playfair Display, serif",
              color: "#000",
              textAlign: "center",
            }}
          >
            Reset Password
          </Typography>
          {email ? (
            <OTPForm email={email} />
          ) : (
            <EmailForm
              onSuccess={setEmail}
              setResponseMessage={setResponseMessage}
            />
          )}
          <Link to="/">
            <Button variant="text">Back to Login</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};
