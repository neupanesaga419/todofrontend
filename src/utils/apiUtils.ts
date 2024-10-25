import {jwtDecode} from "jwt-decode";

interface TokenData {
  authToken: string | null;
  refreshToken: string | null;
}

interface DecodedToken {
  exp: number; // Expiry time in Unix timestamp format
}

// Retrieve tokens from local storage
export const getTokenData = (): TokenData => {
  const authToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    authToken,
    refreshToken,
  };
};

// Check if the user is logged in based on authToken validity
export const isLoggedIn = (): boolean => {
  const { authToken } = getTokenData();

  if (authToken) {
    return !isTokenExpired(); // User is logged in if authToken exists and hasn't expired
  }

  return false; // User is not logged in if no valid authToken is present
};

// Get the expiration time of authToken in milliseconds
export const getTokenExpiry = (): number | null => {
  const { authToken } = getTokenData();
 

  if (!authToken) return null;

  try {
    const decoded: DecodedToken = jwtDecode(authToken);
    // Return expiry time in milliseconds
    return decoded.exp * 1000;
  } catch (error) {
    console.error("Failed to decode authToken:", error);
    return null;
  }
};

// Check if a given token has expired
const isTokenExpired = (): boolean => {
  const expiryTime = getTokenExpiry();
  return expiryTime ? expiryTime <= Date.now() : true;
};

// Check if refreshToken has expired
export const isRefreshTokenExpired = (): boolean => {
  const { refreshToken } = getTokenData();

  if (refreshToken) {
    const refreshTokenExpiry = decodeTokenExpiry(refreshToken);
    return refreshTokenExpiry <= Date.now();
  }

  return true;
};

// Decode token expiry time (used for both authToken and refreshToken)
const decodeTokenExpiry = (token: string): number => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000; // Convert expiry to milliseconds
  } catch (error) {
    console.error("Failed to decode token:", error);
    return 0;
  }
};
