export const authEndpoints = {
  checkUser: "/auth/check-user",
  sendOtp: "/auth/send-otp",
  verifyOtp: "/auth/verify-otp",
  profile: "/auth/profile",
  refreshToken: "/auth/refresh",
  getUser: "/auth/me",
} as const;
