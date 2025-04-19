import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

interface PhoneLoginProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  otp: string;
  setOtp: (value: string) => void;
  confirmationResult: boolean | null;
  loading: boolean;
  handlePhoneLogin: () => void;
  handleVerifyOTP: () => void;
  handleBack: () => void;
  isNewUser: boolean;
  name: string;
  setName: (value: string) => void;
}

export function PhoneLogin({
  phoneNumber,
  setPhoneNumber,
  otp,
  setOtp,
  confirmationResult,
  loading,
  handlePhoneLogin,
  handleVerifyOTP,
  handleBack,
  isNewUser,
  name,
  setName,
}: Readonly<PhoneLoginProps>) {
  const getButtonText = () => {
    if (loading) return "Please wait...";
    if (confirmationResult) return "Verify OTP";
    if (isNewUser && !name) return "Continue with Name";
    if (isNewUser && name) return "Send OTP";
    return "Send OTP";
  };

  return (
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
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            setPhoneNumber(value);
          }}
          maxLength={10}
          className="h-12 sm:h-14 text-base sm:text-lg px-4 rounded-[14px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      {isNewUser && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <Label className="text-sm sm:text-base font-medium text-gray-900">
            Your Name
          </Label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 sm:h-14 text-base sm:text-lg px-4 rounded-[14px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </motion.div>
      )}

      {confirmationResult && ((isNewUser && name) || !isNewUser) && (
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
          onClick={confirmationResult ? handleVerifyOTP : handlePhoneLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 sm:h-14 text-sm sm:text-base font-medium rounded-[14px]"
          disabled={
            loading ||
            !phoneNumber ||
            phoneNumber.length < 10 ||
            (isNewUser && !name)
          }
        >
          {getButtonText()}
        </Button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={handleBack}
        className="flex items-center justify-center w-full text-gray-600 hover:text-gray-900 text-sm sm:text-base font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login options
      </motion.button>
    </motion.div>
  );
}
