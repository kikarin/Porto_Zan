"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#e0683c", "#f0a07a", "#1d1a16", "#10b981", "#e3d8c6"];

export default function Confetti({ count = 36 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 90 + Math.random() * 160;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 60,
          rotate: Math.random() * 720 - 360,
          color: COLORS[i % COLORS.length],
          round: i % 3 === 0,
          delay: Math.random() * 0.08,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 z-raised">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 140], rotate: p.rotate, opacity: [1, 1, 0], scale: 1 }}
          transition={{ duration: 1.4, delay: p.delay, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 1] }}
          className={`absolute block ${p.round ? "h-2 w-2 rounded-full" : "h-3 w-1.5 rounded-sm"}`}
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
