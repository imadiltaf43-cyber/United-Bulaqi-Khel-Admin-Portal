import API from "./api";

// Login
export const loginAdmin = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await API.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

// Verify OTP
export const verifyOtp = async (data) => {
  const response = await API.post(
    "/auth/verify-otp",
    data
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await API.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};

