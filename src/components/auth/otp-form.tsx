"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type OtpFormProps = {
  phoneNumber: string;
  isNewUser: boolean;
  onBack: () => void;
};

export function OtpForm({ onBack }: OtpFormProps) {
  const { verifyOtpAndProceed, resendOtp, isLoading, error } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [localError, setLocalError] = useState("");
  const [countdown, setCountdown] = useState(30);
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
    try {
      await verifyOtpAndProceed(otpValue);
      // Success: useAuth handles redirect
    } catch {
      setLocalError("Invalid verification code. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp();
      setCountdown(30);
      setLocalError("");
    } catch {
      setLocalError("Failed to resend code. Please try again.");
    }
  };

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
                className="h-12 w-full rounded-md border border-input bg-background px-0 text-center text-lg shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />
            </motion.div>
          ))}
        </div>

        {(error || localError) && (
          <p className="text-sm font-medium text-destructive">
            {error || localError}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          type="button"
          onClick={() => handleVerify(otp.join(""))}
          disabled={otp.includes("") || isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          {countdown > 0 ? (
            <span>Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:underline focus:outline-none"
              disabled={isLoading}
            >
              Resend Code
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
