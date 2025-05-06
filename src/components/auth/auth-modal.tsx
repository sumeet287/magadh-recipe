"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneForm } from "@/components/auth/phone-form";
import { NameForm } from "@/components/auth/name-form";
import { OtpForm } from "@/components/auth/otp-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const router = useRouter();
  const { startAuth, updateUserProfile, authState } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Open the modal when the component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handlePhoneSubmit = async (phone: string) => {
    try {
      await startAuth(phone);
    } catch (error) {
      console.error("Error starting auth:", error);
      // error handled in hook
    }
  };

  const handleNameSubmit = async (name: string) => {
    try {
      await updateUserProfile(name);
    } catch (error) {
      console.error("Error updating user profile:", error);
      // error handled in hook
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Navigate back after the close animation finishes
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const handleBack = () => {
    // Handle back button logic based on current step
    if (authState.needsOtp) {
      // Reset to phone input step
      router.push("/auth");
    } else if (authState.needsName) {
      // Go back to OTP verification
      router.push("/auth");
    }
  };

  // Determine step from authState
  let step: "phone" | "name" | "otp" = "phone";
  if (authState.needsName) step = "name";
  else if (authState.needsOtp) step = "otp";

  // Dynamic title for accessibility
  const dialogTitle =
    step === "phone"
      ? "Login to Your Account"
      : step === "name"
      ? "Complete Your Profile"
      : "Verify Your Phone";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 border-0 max-w-sm bg-transparent shadow-none">
        {/* Accessibility: DialogTitle for screen readers */}
        <DialogTitle className="sr-only">{dialogTitle}</DialogTitle>
        <Card className="w-full rounded-2xl shadow-xl border-0 relative overflow-hidden">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <CardHeader className="pb-2 pt-8">
            {/* Visible title for users */}
            <span className="text-2xl font-bold text-center text-orange-600 block">
              {dialogTitle}
            </span>
            <CardDescription className="text-center text-base mt-1 mb-2">
              {step === "phone" && "Enter your phone number to continue"}
              {step === "name" && "Please tell us your name"}
              {step === "otp" &&
                `We've sent a verification code to ${authState.phoneNumber}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PhoneForm onSubmit={handlePhoneSubmit} />
                </motion.div>
              )}

              {step === "name" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NameForm onSubmit={handleNameSubmit} onBack={handleBack} />
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <OtpForm
                    phoneNumber={authState.phoneNumber}
                    isNewUser={authState.isNewUser}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
