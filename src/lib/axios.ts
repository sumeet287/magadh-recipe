import axios from "axios";
import { authEndpoints } from "./endpoints/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

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

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Try to refresh token
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

        // Store new tokens
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update auth header and retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear storage and redirect to login
        localStorage.clear();

        // Only redirect if we're in browser environment
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }

        return Promise.reject(
          new Error(
            refreshError instanceof Error
              ? refreshError.message
              : "Token refresh failed"
          )
        );
      }
    }

    // If error is not 401 or refresh failed
    return Promise.reject(
      new Error(
        error.response?.data?.message ?? error.message ?? "Request failed"
      )
    );
  }
);

export default api;
