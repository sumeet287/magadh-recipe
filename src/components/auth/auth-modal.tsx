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
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface AuthModalProps {
  children: React.ReactNode;
}

export function AuthModal({ children }: Readonly<AuthModalProps>) {
  const {
    startAuth,
    verifyOtpAndProceed,
    updateUserProfile,
    authState,
    isLoading,
    sendOtp,
    setAuthState,
    setIsLoading,
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  // Reset all states when modal closes
  const handleModalClose = () => {
    setIsOpen(false);
    setIsPhoneLogin(false);
    setPhoneNumber("");
    setOtp("");
    setName("");
    setAuthState({
      isNewUser: false,
      needsOtp: false,
      needsName: false,
      phoneNumber: "",
      name: "",
    });
  };

  const handlePhoneLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setIsLoading(true);

      // If we haven't checked user status yet
      if (!authState.phoneNumber) {
        await startAuth(phoneNumber);
        setIsLoading(false);
        return;
      }

      // At this point, we know if it's a new user or not
      if (authState.isNewUser) {
        if (!name || name.trim().length < 2) {
          toast.error("Please enter your full name");
          return;
        }
        // Now we can send OTP with name
        await sendOtp({ phoneNumber, name });
      } else {
        // For existing users, directly send OTP
        await sendOtp({ phoneNumber });
      }

      setAuthState((prev) => ({ ...prev, needsOtp: true }));
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      await verifyOtpAndProceed(otp);

      // For new users, update profile with name
      if (authState.isNewUser) {
        await updateUserProfile(name);
      }

      handleModalClose();
      toast.success("Login successful!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "OTP verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsPhoneLogin(false);
    setOtp("");
    setPhoneNumber("");
    setName("");
    setAuthState({
      isNewUser: false,
      needsOtp: false,
      needsName: false,
      phoneNumber: "",
      name: "",
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleModalClose();
        else setIsOpen(true);
      }}
    >
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
                <LoginOptions setIsPhoneLogin={setIsPhoneLogin} />
              ) : (
                <PhoneLogin
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  otp={otp}
                  setOtp={setOtp}
                  confirmationResult={authState.needsOtp}
                  loading={isLoading}
                  handlePhoneLogin={handlePhoneLogin}
                  handleVerifyOTP={handleVerifyOTP}
                  handleBack={handleBack}
                  isNewUser={authState.isNewUser}
                  name={name}
                  setName={setName}
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
