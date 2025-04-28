"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhoneForm } from "@/components/auth/phone-form";
import { NameForm } from "@/components/auth/name-form";
import { OtpForm } from "@/components/auth/otp-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { startAuth, updateUserProfile, authState } = useAuth();

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

  // Determine step from authState
  let step: "phone" | "name" | "otp" = "phone";
  if (authState.needsName) step = "name";
  else if (authState.needsOtp) step = "otp";
  console.log(step, "step");

  return (
    <div className="flex items-center justify-center min-h-0 p-0">
      <Card className="w-full max-w-sm rounded-2xl shadow-xl border-0 p-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center">
            {step === "phone" && "Login to Your Account"}
            {step === "name" && "Complete Your Profile"}
            {step === "otp" && "Verify Your Phone"}
          </CardTitle>
          <CardDescription className="text-center text-base mt-1 mb-2">
            {step === "phone" && "Enter your phone number to continue"}
            {step === "name" && "Please tell us your name"}
            {step === "otp" &&
              `We've sent a verification code to ${authState.phoneNumber}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
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
                <NameForm onSubmit={handleNameSubmit} onBack={() => {}} />
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
                  onBack={() => {}}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
