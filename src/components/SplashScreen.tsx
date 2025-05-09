"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Particle = {
  x: number;
  y: number;
  delay: number;
  duration: number;
  bg: string;
};

export const SplashScreen = ({ onFinish }: { onFinish?: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random positions only on client
    const generated = Array.from({ length: 30 }, () => ({
      x: Math.random() * 1440,
      y: Math.random() * 900,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      bg: `radial-gradient(circle, rgba(234, 179, 8, ${
        0.3 + Math.random() * 0.2
      }) 0%, rgba(234, 179, 8, 0) 70%)`,
    }));
    setParticles(generated);

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background with Gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 "
          >
            {/* Enhanced Particle System */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: p.bg }}
                  initial={{ x: p.x, y: p.y, scale: 0 }}
                  animate={{
                    x: Math.random() * 1440,
                    y: Math.random() * 900,
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <div className="relative flex flex-col items-center space-y-8">
            {/* Enhanced Logo Container with Multiple Effects */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotateX: 0,
                y: [0, -15, 0],
              }}
              transition={{
                duration: 1.5,
                ease: [0.6, -0.05, 0.01, 0.99],
                rotateX: {
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
              className="relative w-48 h-48 perspective-1000"
            >
              {/* Glitch Effect Layers */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{
                    x: [0, Math.random() * 10 - 5, 0],
                    y: [0, Math.random() * 10 - 5, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 2 + i * 0.5,
                    ease: "linear",
                  }}
                >
                  <Image
                    src="/Bihar_Bazaar.png"
                    alt="Bihar Bazaar Logo"
                    fill
                    className="object-contain transform-gpu"
                    priority
                  />
                </motion.div>
              ))}

              {/* Enhanced Glowing Effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(234, 179, 8, 0)",
                    "0 0 30px 20px rgba(234, 179, 8, 0.2)",
                    "0 0 0 0 rgba(234, 179, 8, 0)",
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full"
              />
            </motion.div>

            {/* Enhanced Loading Bar with Shimmer */}
            <div className="relative w-48 h-2 bg-amber-100/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>

            {/* Enhanced Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Craft Bihar
              </motion.div>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 blur-sm bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Craft Bihar
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
