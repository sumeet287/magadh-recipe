"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
} from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export function SignInForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loadRecaptcha = async () => {
      if (typeof window !== "undefined") {
        const { RecaptchaVerifier } = await import("firebase/auth");
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
              callback: () => {
                console.log("reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("reCAPTCHA expired");
              },
            }
          );
        }
      }
    };

    loadRecaptcha();
  }, []);

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+91${phoneNumber}`;

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmation);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal",
            callback: () => {
              console.log("reCAPTCHA solved");
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired");
            },
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      const result = await confirmationResult?.confirm(otp);
      const user = result?.user;

      const idToken = await user?.getIdToken();
      console.log("Firebase ID Token:", idToken);

      try {
        const verifyResponse = await axios.post(
          "http://localhost:3001/auth/verify-token",
          {
            token: idToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (verifyResponse.data.success) {
          console.log("Token verified successfully");
          router.push("/dashboard");
        }
      } catch (backendError: unknown) {
        console.error("Backend verification error:", backendError);
        alert("Error verifying with backend. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Error in OTP verification:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key="signin-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md space-y-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700"
        >
          <div className="text-center space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent"
            >
              Phone Number Login
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-600 dark:text-slate-300"
            >
              Sign in with your phone number
            </motion.p>
          </div>

          <div className="space-y-6">
            {!confirmationResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                id="recaptcha-container"
                className="flex justify-center"
              ></motion.div>
            )}

            <AnimatePresence mode="wait">
              {!confirmationResult ? (
                <motion.div
                  key="phone-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="Enter phone number (e.g., +91XXXXXXXXXX)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      📱
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 dark:shadow-orange-800/30 transition-all duration-300"
                    onClick={handleSendOTP}
                    disabled={isLoading || !phoneNumber}
                  >
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                      Enter the verification code sent to{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {phoneNumber}
                      </span>
                    </p>
                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        textAlign="center"
                        className="gap-2"
                      >
                        <InputOTPGroup className="gap-2 has-[:disabled]:opacity-50">
                          <InputOTPSlot
                            index={0}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                          <InputOTPSeparator className="text-slate-400 dark:text-slate-500" />
                          <InputOTPSlot
                            index={3}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="rounded-xl border-slate-200 dark:border-slate-600 focus:border-orange-500 dark:focus:border-orange-400 transition-colors w-12 h-12 text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 dark:shadow-orange-800/30 transition-all duration-300"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </motion.div>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
