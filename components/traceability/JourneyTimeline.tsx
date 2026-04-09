"use client";

import { motion } from "framer-motion";
import { TRACEABILITY_STEPS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const icons = ["🌊", "❄️", "✓", "📦", "📱"];

export function JourneyTimeline() {
  return (
    <motion.div
      className="relative mx-auto max-w-2xl pl-2"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div
        className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-seafoam-500 via-seafoam-500/40 to-transparent md:left-[23px]"
        aria-hidden
      />
      <ol className="space-y-10">
        {TRACEABILITY_STEPS.map((step, index) => (
          <motion.li
            key={step.title}
            variants={fadeUp}
            className="relative flex gap-5 md:gap-8"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-seafoam-500 bg-navy-900 text-xl shadow-lg shadow-seafoam-500/20">
              {icons[index] ?? "•"}
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-navy-800 bg-navy-800/50 p-6">
              <h3 className="font-display text-xl font-bold text-white">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 text-slate-400">{step.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
