// import dotenv from 'dotenv';
// dotenv.config();

// const IP_ADDRESS = process.env.IP_ADDRESS;

const IP_ADDRESS = import.meta.env.VITE_IP_ADDRESS;

// export const BASE_URL = "http://0.0.0.0:8000"
export const BASE_URL = `http://${IP_ADDRESS}:8000`

export const GET_TOKEN = "/auth/token/"

export const REFRESH_TOKEN = "/auth/token/refresh/"

export const GET_USER = "/auth/users/"

export const CREATE_TODO = "/api/todos/"


export const CREATE_ACCOUNT = "/auth/register/"

export const VERIFY_OTP = "/auth/register/verify_otp/"

export const RESEND_OTP = "/auth/register/resend_otp/"

export const SEND_RESET_PASSWORD_OTP = "/auth/register/forgot_password/"

export const VERIFY_RESET_PASSWORD_OTP = "/auth/register/reset_password/"