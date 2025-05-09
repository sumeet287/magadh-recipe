"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  userPhone: string | null;
  userName: string | null;
  token: string | null;
  login: (
    phone: string,
    name?: string,
    tokens?: { accessToken: string; refreshToken: string }
  ) => void;
  logout: () => void;
  updateProfile: (name: string) => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userPhone: null,
  userName: null,
  token: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  checkAuth: () => false,
});

interface AuthProviderProps {
  readonly children: React.ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const phone = localStorage.getItem("userPhone");
    const name = localStorage.getItem("userName");

    if (token) {
      setIsAuthenticated(true);
      setUserPhone(phone);
      setUserName(name);
      setToken(token);
      return true;
    } else {
      setIsAuthenticated(false);
      setUserPhone(null);
      setUserName(null);
      setToken(null);
      return false;
    }
  };

  // Check auth on mount and pathname change
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const login = (
    phone: string,
    name?: string,
    tokens?: { accessToken: string; refreshToken: string }
  ) => {
    if (tokens) {
      localStorage.setItem("token", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setToken(tokens.accessToken);
    }

    localStorage.setItem("userPhone", phone);
    if (name) {
      localStorage.setItem("userName", name);
      setUserName(name);
    }

    setIsAuthenticated(true);
    setUserPhone(phone);
  };

  const updateProfile = (name: string) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("loginPhoneNumber");

    setIsAuthenticated(false);
    setUserPhone(null);
    setUserName(null);
    setToken(null);

    router.push("/");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userPhone,
      userName,
      token,
      login,
      logout,
      updateProfile,
      checkAuth,
    }),
    [isAuthenticated, userPhone, userName, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
