"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function TraceabilityTeaser() {
  return (
    <motion.section
      className="border-y border-slate-100 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-seafoam-600">
            Tech-forward traceability
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Scan. Verify. Trust.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every retail pack carries a QR journey — harvest origin, cold-chain
            handoffs, and MSC chain-of-custody where certified. No marketing
            fluff: auditable data your customers can see.
          </p>
          <Link
            href="/traceability"
            className="mt-8 inline-flex items-center rounded-full bg-seafoam-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-seafoam-600"
          >
            Explore the journey
          </Link>
        </div>
        <div className="mt-10 flex flex-1 justify-center lg:mt-0">
          <div className="relative aspect-square w-full max-w-sm rounded-2xl border border-slate-200 bg-gradient-to-br from-navy-900 to-navy-800 p-8 shadow-2xl">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-seafoam-500/40 bg-navy-800/50">
              <div className="rounded-lg bg-white p-4 shadow-lg">
                <div className="h-32 w-32 bg-[linear-gradient(45deg,#0A1628_25%,transparent_25%,transparent_75%,#0A1628_75%,#0A1628),linear-gradient(45deg,#0A1628_25%,transparent_25%,transparent_75%,#0A1628_75%,#0A1628)] bg-[length:16px_16px] bg-[position:0_0,8px_8px]" />
              </div>
              <p className="mt-4 text-center text-xs text-slate-400">
                QR demo — link to lot-level trace data
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
