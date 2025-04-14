"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RecaptchaVerifier } from "firebase/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Phone, ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

type MockConfirmationResult = {
  confirm: (verificationCode: string) => Promise<void>;
};

export function AuthModal({ children }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<MockConfirmationResult | null>(null);
  const router = useRouter();

  const handlePhoneLogin = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number", {
        description: "A phone number is required to continue",
      });
      return;
    }

    setLoading(true);
    try {
      /*  const formattedPhoneNumber = phoneNumber.startsWith("+91")
        ? phoneNumber
        : `+91${phoneNumber.replace(/\D/g, "")}`; */

      setConfirmationResult({
        confirm: async () => {
          return;
        },
      });
      toast.success("OTP Sent Successfully", {
        description: "Please check your phone for the verification code",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter OTP", {
        description: "Verification code is required",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/verify-otp", {
        phoneNumber: phoneNumber,
        otp: otp,
      });

      if (response.data.success) {
        toast.success("Login Successful", {
          description: "Welcome to Bihar Bazaar!",
        });
        setIsOpen(false);
        router.push("/dashboard");
      } else {
        toast.error("Invalid OTP", {
          description: "Please check the code and try again",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification Failed", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google login here
  };

  return (
    <>
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
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <Button
                      onClick={() => setIsPhoneLogin(true)}
                      variant="outline"
                      className="w-full py-6 text-base border-2 hover:bg-orange-50 hover:border-orange-500 space-x-3"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Continue with Phone</span>
                    </Button>

                    <Button
                      onClick={handleGoogleLogin}
                      variant="outline"
                      className="w-full py-6 text-base border-2 hover:bg-orange-50 hover:border-orange-500 space-x-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm sm:text-base font-medium text-gray-900">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="9810790293"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-12 sm:h-14 text-base sm:text-lg px-4 rounded-[14px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    {confirmationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <label className="text-sm sm:text-base font-medium text-gray-900">
                          Enter OTP
                        </label>
                        <div className="flex flex-col items-center w-full">
                          <InputOTP
                            value={otp}
                            onChange={setOtp}
                            maxLength={6}
                            className="gap-1 sm:gap-2 w-full"
                          >
                            <div className="flex w-full gap-1 sm:gap-2 justify-center max-w-[360px] mx-auto">
                              <InputOTPGroup className="gap-1 sm:gap-2 flex justify-center">
                                {[0, 1, 2].map((index) => (
                                  <InputOTPSlot
                                    key={`otp-slot-${index}`}
                                    index={index}
                                    className="w-[40px] sm:w-[48px] h-[40px] sm:h-[48px] text-base sm:text-lg rounded-xl sm:rounded-[14px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                  />
                                ))}
                              </InputOTPGroup>
                              <div className="flex items-center px-1 sm:px-2">
                                <div className="w-2 sm:w-3 h-[2px] bg-gray-300" />
                              </div>
                              <InputOTPGroup className="gap-1 sm:gap-2 flex justify-center">
                                {[3, 4, 5].map((index) => (
                                  <InputOTPSlot
                                    key={`otp-slot-${index}`}
                                    index={index}
                                    className="w-[40px] sm:w-[48px] h-[40px] sm:h-[48px] text-base sm:text-lg rounded-xl sm:rounded-[14px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                  />
                                ))}
                              </InputOTPGroup>
                            </div>
                          </InputOTP>
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        onClick={
                          confirmationResult
                            ? handleVerifyOTP
                            : handlePhoneLogin
                        }
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 sm:h-14 text-sm sm:text-base font-medium rounded-[14px]"
                        disabled={loading || !phoneNumber}
                      >
                        {loading
                          ? "Please wait..."
                          : confirmationResult
                          ? "Verify OTP"
                          : "Get OTP"}
                      </Button>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => {
                        setIsPhoneLogin(false);
                        setConfirmationResult(null);
                        setOtp("");
                        setPhoneNumber("");
                      }}
                      className="flex items-center justify-center w-full text-gray-600 hover:text-gray-900 text-sm sm:text-base font-medium"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to login options
                    </motion.button>
                  </motion.div>
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
    </>
  );
}
