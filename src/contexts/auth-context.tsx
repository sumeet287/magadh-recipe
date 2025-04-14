"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userPhone: string | null;
  login: (phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userPhone: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = localStorage.getItem("isAuthenticated");
    const phone = localStorage.getItem("userPhone");
    setIsAuthenticated(authStatus === "true");
    setUserPhone(phone);
  }, []);

  const login = (phone: string) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userPhone", phone);
    setIsAuthenticated(true);
    setUserPhone(phone);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userProfile");
    setIsAuthenticated(false);
    setUserPhone(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userPhone, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
