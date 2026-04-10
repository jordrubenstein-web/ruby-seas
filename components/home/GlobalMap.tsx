"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const ReachMap = dynamic(() => import("./ReachMap").then((m) => m.ReachMap), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-[320px] w-full items-center justify-center rounded-xl bg-navy-950 text-sm text-slate-400 md:min-h-[420px]"
      aria-busy
      aria-label="Loading map"
    >
      Loading map…
    </div>
  ),
});

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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,11,20,0.97), rgba(10,22,40,0.95), rgba(5,11,20,0.98))",
          }}
        />
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
        <div className="max-w-3xl rounded-2xl border border-white/25 bg-[#050B14] px-5 py-5 shadow-[0_8px_32px_rgb(0_0_0/0.55)] ring-1 ring-black/30 sm:px-6 sm:py-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400 [text-shadow:0_1px_2px_rgb(0_0_0/0.9)]">
            Network
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.85)] md:text-4xl">
            Our reach is global
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed text-white/95 [text-shadow:0_1px_3px_rgb(0_0_0/0.9)]">
            Operational presence across key seafood markets — customers and
            suppliers in every region we serve. Zoom in to see location names;
            click a marker to focus.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-lg backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
            <div className="relative z-0 h-[320px] min-h-[320px] w-full md:h-[420px] md:min-h-[420px]">
              <ReachMap />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
