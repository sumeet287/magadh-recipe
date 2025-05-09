import axios from "axios";
import { authEndpoints } from "./endpoints/auth";
import { clearAuthAndRedirect } from "../utils/auth";

const baseURL = "http://localhost:3001";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message ?? "Request failed"));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only try refresh once and only if we have a refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${baseURL}${authEndpoints.refreshToken}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { accessToken, newRefreshToken } = response.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update auth header and retry
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        // If refresh fails, clear everything and redirect
        clearAuthAndRedirect();
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }
    }

    // If it's a 401 but we already tried refresh, just logout
    if (error.response?.status === 401) {
      // Don't logout if it's the OTP verify endpoint
      if (
        originalRequest.url &&
        originalRequest.url.includes(authEndpoints.verifyOtp)
      ) {
        // Check if error message from backend is about OTP or session
        const backendMsg = error.response?.data?.message || "";
        if (backendMsg.toLowerCase().includes("otp")) {
          return Promise.reject(new Error("Invalid OTP. Please try again."));
        }
        // Default to session expired
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }
      clearAuthAndRedirect();
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    return Promise.reject(error);
  }
);

export default api;
