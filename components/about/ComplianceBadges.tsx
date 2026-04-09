"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const BADGES = [
  { label: "EU Standards", detail: "Export compliance" },
  { label: "FDA", detail: "Health & quality" },
  { label: "MSC", detail: "Certified fisheries" },
  { label: "Cold Chain", detail: "Monitored logistics" },
] as const;

export function ComplianceBadges() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {BADGES.map((b) => (
        <motion.div
          key={b.label}
          variants={fadeUp}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <p className="font-display text-xl font-bold text-navy-900">
            {b.label}
          </p>
          <p className="mt-1 text-sm text-slate-500">{b.detail}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
