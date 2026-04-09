"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function QRCodeDemo() {
  return (
    <motion.div
      className="mx-auto max-w-lg rounded-2xl border border-navy-700 bg-navy-800/60 p-8 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-seafoam-400">
        Retail packaging
      </p>
      <div className="mx-auto mt-6 flex max-w-xs justify-center rounded-xl bg-white p-6 shadow-2xl">
        <div
          className="aspect-square w-full max-w-[200px] bg-[length:12px_12px]"
          style={{
            backgroundImage: `linear-gradient(90deg, #0A1628 50%, transparent 50%), linear-gradient(#0A1628 50%, transparent 50%)`,
          }}
        />
      </div>
      <p className="mt-6 text-sm text-slate-400">
        Scan to view harvest region, vessel or lot ID, and MSC documentation
        where applicable — aligned with EU and FDA record-keeping standards.
      </p>
    </motion.div>
  );
}
