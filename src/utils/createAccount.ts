import { BASE_URL, CREATE_ACCOUNT ,VERIFY_OTP,RESEND_OTP} from "./constant";
import axios from "axios";


interface RegisterFormData {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

interface VerifyOtpData {
    username:string,
  otp:string
}

interface ResendOtpData {
  username: string;
}

interface CreateAccountResponse {
  username: string;
  message: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  error: string;
  can_request_new_otp: boolean;
}

interface ResendOtpResponse {
  success: boolean;
  message: string;
  error: string;
}

export const createAccount = async (data: RegisterFormData): Promise<CreateAccountResponse> => {


    const {email,...rest} = data
    localStorage.setItem("username",email);
    
  const response = await axios.post(`${BASE_URL}${CREATE_ACCOUNT}`, {
    "username":email,...rest
  });
  
  return response.data;
};


export const verifyOtp = async (data: VerifyOtpData): Promise<VerifyOtpResponse> => {
  const response = await axios.post(`${BASE_URL}${VERIFY_OTP}`, data);
  return response.data;
};


export const resendOtp = async (data: ResendOtpData): Promise<ResendOtpResponse> => {
  const response = await axios.post(`${BASE_URL}${RESEND_OTP}`, data);
  return response.data;
};
