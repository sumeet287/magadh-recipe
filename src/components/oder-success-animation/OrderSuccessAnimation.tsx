import Lottie from "lottie-react";
import OrderTruck from "@/assets/OrderTruck.json";
import { motion } from "framer-motion";

export function OrderSuccessAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div>
        <Lottie
          animationData={OrderTruck}
          loop={false}
          style={{ width: 450, height: 450 }}
        />
      </motion.div>
      <motion.p
        className="mt-4 text-2xl font-bold text-[#D84315]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      >
        Order Placed Successfully!
      </motion.p>
    </motion.div>
  );
}
