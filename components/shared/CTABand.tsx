"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { CTAButton } from "./CTAButton";

export function CTABand() {
  return (
    <motion.div
      className="bg-navy-900 py-16 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ready to Source Premium Seafood?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Integrity, transparency, and scale — from verified harvest to your
          dock.
        </p>
        <div className="mt-8">
          <CTAButton href="/get-a-quote" variant="primary">
            Get a Quote
          </CTAButton>
        </div>
      </div>
    </motion.div>
  );
}
