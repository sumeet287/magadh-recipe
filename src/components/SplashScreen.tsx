"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Increased to 2.5 seconds to show full animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                y: [0, -20, 0],
              }}
              transition={{
                duration: 1.5,
                ease: [0.6, -0.05, 0.01, 0.99],
                rotate: {
                  duration: 1.2,
                  ease: "easeOut",
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              className="relative w-48 h-48"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(234, 179, 8, 0)",
                    "0 0 0 20px rgba(234, 179, 8, 0.1)",
                    "0 0 0 0 rgba(234, 179, 8, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full"
              />
              <Image
                src="/Bihar_Bazaar.png"
                alt="Bihar Bazaar Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="h-full bg-amber-400 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
