"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const OCEAN_BACKDROP =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80";

export function GlobalMap() {
  return (
    <motion.section
      id="global-reach"
      className="relative overflow-hidden section-py"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={OCEAN_BACKDROP}
          alt=""
          fill
          className="object-cover opacity-[0.22]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/96 via-navy-900/94 to-navy-950/[0.97]" />
        <div
          className="animate-global-map-grid absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `linear-gradient(rgba(86,197,176,0.28) 1px, transparent 1px),
 linear-gradient(90deg, rgba(86,197,176,0.28) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl rounded-2xl border border-white/10 bg-navy-950/82 px-5 py-5 shadow-lg backdrop-blur-sm sm:px-6 sm:py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Network
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Our reach is global
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-200">
            Operational presence across key seafood markets — customers and
            suppliers in every region we serve.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/20 bg-navy-900/40 shadow-lg backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3 px-6 py-16 text-center md:min-h-[420px]">
              <p className="text-sm font-semibold uppercase tracking-widest text-seafoam-400">
                Global reach
              </p>
              <p className="max-w-md text-base text-slate-300">
                Map and regional visualization will go here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
