"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayfulPointer } from "./usePlayfulPointer";

type Spark = { id: number; x: number; y: number };

const RAYS = 8;

export default function ClickSpark() {
  const enabled = usePlayfulPointer();
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("input, textarea, [contenteditable='true']")) return;
      const spark = { id: performance.now(), x: e.clientX, y: e.clientY };
      setSparks((prev) => [...prev.slice(-5), spark]);
      window.setTimeout(() => setSparks((prev) => prev.filter((s) => s.id !== spark.id)), 650);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-grain">
      <AnimatePresence>
        {sparks.map((spark) => (
          <div key={spark.id} className="absolute" style={{ left: spark.x, top: spark.y }}>
            {Array.from({ length: RAYS }).map((_, i) => {
              const angle = (i / RAYS) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scaleY: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * 26,
                    y: Math.sin(angle) * 26,
                    scaleY: 0.2,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ rotate: `${(angle * 180) / Math.PI + 90}deg` }}
                  className={`absolute -left-[1.5px] -top-[5px] h-2.5 w-[3px] rounded-full ${
                    i % 2 === 0 ? "bg-accent" : "bg-ink"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
