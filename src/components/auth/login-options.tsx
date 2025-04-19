import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface LoginOptionsProps {
  setIsPhoneLogin: (value: boolean) => void;
}

export function LoginOptions({ setIsPhoneLogin }: Readonly<LoginOptionsProps>) {
  return (
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
    </motion.div>
  );
}
