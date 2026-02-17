"use client";

import { motion } from "framer-motion";

export function BreathingOrb() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle at 40% 40%, rgba(74, 111, 165, 0.65) 0%, rgba(97, 138, 197, 0.45) 45%, rgba(11, 25, 48, 0) 75%)"
      }}
      animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
