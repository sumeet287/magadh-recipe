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
import { useAuth as useAuthContext } from "@/contexts/auth-context";

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

  const { login } = useAuthContext();

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

      // Persist phone number for OTP step and refresh safety
      localStorage.setItem("loginPhoneNumber", phoneNumber);

      // Step 1: Check if user exists
      const checkUserData = await checkUser.mutateAsync({ phoneNumber });
      if (checkUserData.isNewUser) {
        setAuthState({
          isNewUser: true,
          needsOtp: false,
          needsName: true,
          phoneNumber,
          name: "",
        });
      } else {
        // Existing user: send OTP
        await sendOtp.mutateAsync({ phoneNumber });
        setAuthState({
          isNewUser: false,
          needsOtp: true,
          needsName: false,
          phoneNumber,
          name: "",
        });
      }
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

      // Use phoneNumber from state or fallback to localStorage
      const phoneNumber =
        authState.phoneNumber || localStorage.getItem("loginPhoneNumber") || "";
      if (!phoneNumber)
        throw new Error("Phone number is missing for OTP verification");

      const { accessToken, refreshToken } = await verifyOtp.mutateAsync({
        phoneNumber,
        otp,
      });

      // Store tokens
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Sync global auth context
      login(phoneNumber, authState.name, { accessToken, refreshToken });

      // If new user, now update profile (user is authenticated)
      if (authState.isNewUser && authState.name) {
        await updateProfile.mutateAsync({ name: authState.name });
      }

      router.push("/profile");
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

      // Send OTP with name for new user
      await sendOtp.mutateAsync({ phoneNumber: authState.phoneNumber, name });
      setAuthState((prev) => ({
        ...prev,
        name,
        needsName: false,
        needsOtp: true,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await sendOtp.mutateAsync({
        phoneNumber: authState.phoneNumber,
        ...(authState.isNewUser && authState.name
          ? { name: authState.name }
          : {}),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startAuth,
    verifyOtpAndProceed,
    updateUserProfile,
    resendOtp,
    authState,
    isLoading,
    error,
    sendOtp: sendOtp.mutateAsync,
    setAuthState,
    setIsLoading,
  };
}
