import {jwtDecode} from 'jwt-decode';

interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
}

interface DecodedToken {
  exp: number; // Expiry time in Unix timestamp format
}

export const getTokenData = (): TokenData => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return {
    accessToken,
    refreshToken,
  };
};

export const isLoggedIn = (): boolean => {
  const { accessToken, refreshToken } = getTokenData();

  // Check if access token exists and is valid
  if (accessToken) {
    return true; // User is logged in if access token is present
  }

  // Check if refresh token is present and has not expired
  if (refreshToken) {
    const refreshTokenExpiry = decodeRefreshTokenExpiry(refreshToken);
    return refreshTokenExpiry > Date.now() / 1000; // Compare expiry time with current time
  }

  return false; // User is not logged in
};

export const isRefreshTokenExpired = (): boolean => {
  const { refreshToken } = getTokenData();

  // Check if the refresh token exists
  if (refreshToken) {
    const refreshTokenExpiry = decodeRefreshTokenExpiry(refreshToken);
    return refreshTokenExpiry <= Date.now() / 1000; // Check if it has expired
  }

  return true; // If no refresh token, it's considered expired
};

const decodeRefreshTokenExpiry = (token: string): number => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp; // Return the expiration time
  } catch (error) {
    console.error('Failed to decode refresh token:', error);
    return 0; // Default to 0 if decoding fails
  }
};
