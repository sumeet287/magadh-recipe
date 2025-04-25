"use client";

// Simple function to clear storage and redirect
export const clearAuthAndRedirect = () => {
  localStorage.clear();
  window.location.href = "/";
};

// Function to check if token exists
export const hasValidToken = () => {
  return !!localStorage.getItem("token");
};
