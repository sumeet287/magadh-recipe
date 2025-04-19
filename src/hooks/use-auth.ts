"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authEndpoints } from "@/lib/endpoints/auth";
import { useApiPost, useApiPatch } from "./useApi";
import type {
  CheckUserResponse,
  VerifyOtpResponse,
  AuthCredentials,
  OtpVerification,
  ProfileUpdate,
} from "@/types/auth";

interface AuthState {
  isNewUser: boolean;
  needsOtp: boolean;
  needsName: boolean;
  phoneNumber: string;
  name?: string;
}

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    isNewUser: false,
    needsOtp: false,
    needsName: false,
    phoneNumber: "",
    name: "",
  });

  const checkUser = useApiPost<CheckUserResponse, { phoneNumber: string }>(
    authEndpoints.checkUser
  );
  const sendOtp = useApiPost<void, AuthCredentials>(authEndpoints.sendOtp);
  const verifyOtp = useApiPost<VerifyOtpResponse, OtpVerification>(
    authEndpoints.verifyOtp
  );
  const updateProfile = useApiPatch<void, ProfileUpdate>(authEndpoints.profile);

  const startAuth = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Step 1: Check if user exists
      const checkUserData = await checkUser.mutateAsync({ phoneNumber });
      console.log(checkUserData, "check user data");
      setAuthState({
        isNewUser: checkUserData.isNewUser,
        needsOtp: false,
        needsName: checkUserData.isNewUser,
        phoneNumber,
        name: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtpAndProceed = async (otp: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { accessToken, refreshToken } = await verifyOtp.mutateAsync({
        phoneNumber: authState.phoneNumber,
        otp,
      });

      // Store tokens
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (!authState.isNewUser) {
        router.push("/profile");
      }

      setAuthState((prev) => ({ ...prev, needsOtp: false }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await updateProfile.mutateAsync({ name });

      setAuthState((prev) => ({ ...prev, needsName: false }));
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startAuth,
    verifyOtpAndProceed,
    updateUserProfile,
    authState,
    isLoading,
    error,
    sendOtp: sendOtp.mutateAsync,
    setAuthState,
    setIsLoading,
  };
}
