"use client";

import { motion } from "framer-motion";

type Props = {
  display: string;
  label: string;
};

export function StatCard({ display, label }: Props) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
        {display}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}
