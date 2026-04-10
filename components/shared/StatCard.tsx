"use client";

import { motion } from "framer-motion";

type Props = {
  display: string;
  label: string;
  /** `light` = white card (default). `dark` = glass card on video / dark backgrounds. */
  variant?: "light" | "dark";
  /** When true, play a one-shot emphasis on the value (e.g. count-up finished). */
  valueSettled?: boolean;
};

export function StatCard({
  display,
  label,
  variant = "light",
  valueSettled = false,
}: Props) {
  const isDark = variant === "dark";

  return (
    <motion.div
      className={
        isDark
          ? "h-full rounded-2xl border border-white/20 bg-navy-900/45 p-6 text-center shadow-lg backdrop-blur-md"
          : "h-full rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
      }
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <motion.p
        className={`font-display text-3xl font-bold tabular-nums md:text-4xl ${isDark ? "text-white" : "text-navy-900"}`}
        animate={
          valueSettled
            ? isDark
              ? {
                  scale: [1, 1.07, 1],
                  textShadow: [
                    "0 0 0px transparent",
                    "0 0 20px rgba(255,255,255,0.4)",
                    "0 0 0px transparent",
                  ],
                }
              : { scale: [1, 1.05, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {display}
      </motion.p>
      <p
        className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-400"}`}
      >
        {label}
      </p>
    </motion.div>
  );
}
