"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const ACTS = [
  {
    title: "Origin",
    subtitle: "Built for transparency",
    body: "Founded in Canada with direct access to North Atlantic lobster and snow crab grounds, Ruby Seas was built on a single principle: the seafood industry deserves radical transparency.",
  },
  {
    title: "Scale",
    subtitle: "Global operations",
    body: "Today we operate from four US states, ship through 42 ports, and serve retail, wholesale, and international markets across Asia, Europe, and the Americas. Our 14,520+ shipments speak for themselves.",
  },
  {
    title: "Integrity",
    subtitle: "No shortcuts",
    body: "Every product we sell meets both EU and FDA health standards. Our Bahamas spiny lobster fishery is MSC-certified sustainable. We never use sodium metabisulfite or sodium tripolyphosphate. One freeze. Zero shortcuts.",
  },
] as const;

export function NarrativeSection() {
  return (
    <motion.div
      className="space-y-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {ACTS.map((act, i) => (
        <motion.section key={act.title} variants={fadeUp}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-600">
            Act {i + 1} — {act.title}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 md:text-4xl">
            {act.subtitle}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {act.body}
          </p>
        </motion.section>
      ))}
    </motion.div>
  );
}
