"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/lib/ui/button/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type OtpFormProps = {
  phoneNumber: string;
  isNewUser: boolean;
  onBack: () => void;
};

export function OtpForm({ phoneNumber, onBack }: OtpFormProps) {
  const { verifyOtpAndProceed, resendOtp, isLoading, error } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [localError, setLocalError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Clear error when user types
    if (localError) setLocalError("");

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs?.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value && !newOtp.includes("")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs?.current[index - 1]?.focus();
      }
    }

    // Handle left arrow key
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs?.current[index - 1]?.focus();
    }

    // Handle right arrow key
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs?.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }

      // Auto-submit
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpValue: string) => {
    if (isLoading) return;

    try {
      await verifyOtpAndProceed(otpValue);
      // Success: useAuth handles redirect
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again.";
      setLocalError(errorMessage);

      // Clear OTP fields on error
      setOtp(Array(6).fill(""));
      if (inputRefs?.current?.[0]) {
        inputRefs?.current?.[0]?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    try {
      await resendOtp();
      setCountdown(30);
      setLocalError("");
      setOtp(Array(6).fill(""));

      // Focus the first input after resend
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (err) {
      console.error(err);
      setLocalError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";

    // If it has country code, try to format it
    if (phone.startsWith("+")) {
      return phone;
    }

    // If it's just 10 digits, format as Indian number
    if (phone.length === 10) {
      return phone;
    }

    // If it has 91 prefix (India), format it
    if (phone.startsWith("91") && phone.length === 12) {
      return phone.slice(2);
    }

    return phone;
  };

  const displayPhone = formatPhoneNumber(phoneNumber);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          {otp.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-0 text-center text-lg shadow-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                aria-label={`OTP digit ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>

        {(error || localError) && (
          <p className="text-sm font-medium text-red-500 text-center mt-2">
            {error || localError}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          type="button"
          onClick={() => handleVerify(otp.join(""))}
          disabled={otp.includes("") || isLoading}
          variant="default"
          fullWidth
          className="py-6"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-orange-600 hover:underline focus:outline-none"
              disabled={isLoading || isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="inline-block mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </button>
          )}
        </p>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>
          We sent a verification code to{" "}
          <span className="font-medium">{displayPhone}</span>
        </p>
      </div>
    </div>
  );
}
