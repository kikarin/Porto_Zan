"use client";

import { motion } from "framer-motion";

const letters = ["z", "a", "n"];

export default function Loader() {
  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-modal flex flex-col items-center justify-center bg-canvas"
    >
      <div className="flex items-end font-display text-7xl font-bold tracking-[-0.06em] text-ink md:text-8xl">
        {letters.map((letter, i) => (
          <motion.span
            key={letter}
            initial={{ y: 60, opacity: 0, rotate: -12 }}
            animate={{ y: [60, -14, 0], opacity: 1, rotate: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="inline-block text-accent"
        >
          .
        </motion.span>
      </div>
      <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-sand">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full origin-left rounded-full bg-accent"
        />
      </div>
    </motion.div>
  );
}
