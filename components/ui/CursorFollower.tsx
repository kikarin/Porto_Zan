"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { usePlayfulPointer } from "./usePlayfulPointer";

type Mode = "default" | "hover" | "text" | "label";

export default function CursorFollower() {
  const enabled = usePlayfulPointer();
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        setMode("label");
        return;
      }
      if (target.closest("input, textarea, [contenteditable='true']")) {
        setMode("text");
        return;
      }
      setMode(target.closest("a, button, [role='tab'], label") ? "hover" : "default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 84 : mode === "hover" ? 52 : 12;

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-grain"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible && (mode === "hover" || mode === "label") ? 1 : 0,
          backgroundColor:
            mode === "label"
              ? "rgba(224, 104, 60, 0.95)"
              : mode === "hover"
                ? "rgba(224, 104, 60, 0.14)"
                : "rgba(224, 104, 60, 0)",
          borderColor: mode === "label" ? "rgba(224, 104, 60, 0)" : "rgba(29, 26, 22, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px]"
      >
        <AnimatePresence>
          {mode === "label" && label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
