"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { LoginOptions } from "./login-options";
import { PhoneLogin } from "./phone-login";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface AuthModalProps {
  children: React.ReactNode;
}

export function AuthModal({ children }: Readonly<AuthModalProps>) {
  const { login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    // Google login implementation
  };

  const handlePhoneLogin = async () => {
    if (!phoneNumber) return;
    setLoading(true);

    try {
      // Simulating OTP send
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConfirmationResult(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    setLoading(true);

    try {
      if (otp === "123456") {
        login(phoneNumber);
        setIsOpen(false);
        toast.success("Login successful!");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsPhoneLogin(false);
    setConfirmationResult(null);
    setOtp("");
    setPhoneNumber("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-4 pt-6 sm:pt-8 w-[calc(100%-32px)] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="space-y-3 mb-6">
              <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
                Sign in to Bihar Bazaar
              </DialogTitle>
              <p className="text-gray-500 text-sm sm:text-base text-center">
                Handicrafts ka Digital Marketplace
              </p>
            </DialogHeader>

            <div className="space-y-6">
              {!isPhoneLogin ? (
                <LoginOptions
                  setIsPhoneLogin={setIsPhoneLogin}
                  handleGoogleLogin={handleGoogleLogin}
                />
              ) : (
                <PhoneLogin
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  otp={otp}
                  setOtp={setOtp}
                  confirmationResult={confirmationResult}
                  loading={loading}
                  handlePhoneLogin={handlePhoneLogin}
                  handleVerifyOTP={handleVerifyOTP}
                  handleBack={handleBack}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
