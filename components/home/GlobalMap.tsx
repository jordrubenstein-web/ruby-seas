"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { SPLASH_POSTER_IMAGE } from "@/lib/constants";
import { GLOBAL_REACH_LOCATIONS } from "@/lib/globalReachLocations";

const ReachMap = dynamic(
  () => import("./ReachMap").then((m) => m.ReachMap),
  { ssr: false, loading: () => <div className="h-full min-h-[280px] w-full animate-pulse rounded-xl bg-slate-100 md:min-h-[320px]" aria-hidden /> },
);

/** Local asset — same family as splash poster; avoids remote Unsplash failures. */
const OCEAN_BACKDROP = SPLASH_POSTER_IMAGE;

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const hubCount = GLOBAL_REACH_LOCATIONS.length;

  return (
    <section
      id="global-reach"
      className="relative overflow-hidden section-py bg-pearl"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={OCEAN_BACKDROP}
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(248,249,250,0.94), rgba(255,255,255,0.97), rgba(248,249,250,0.96))",
          }}
        />
        <div
          className="animate-global-map-grid absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(15,35,65,0.15) 1px, transparent 1px),
 linear-gradient(90deg, rgba(15,35,65,0.15) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Our Global Reach
          </h2>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
            Tap a pin for the city name
          </p>
        </motion.div>

        {/* Leaflet map: keep outside Framer Motion to avoid remount races with Strict Mode */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg">
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/[0.04]" />
          <button
            type="button"
            className="reach-map-reset-btn"
            onClick={() => setActiveId(null)}
          >
            All locations
          </button>
          <div className="relative z-0 h-[320px] min-h-[320px] w-full md:h-[420px] md:min-h-[420px]">
            <ReachMap activeId={activeId} onActiveIdChange={setActiveId} />
          </div>

          <div className="relative z-10 border-t border-slate-200/90 bg-gradient-to-b from-pearl to-white px-3 py-3 sm:px-4 sm:py-3.5">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="font-display text-base font-extrabold tracking-tight text-black md:text-lg">
                Operations
              </h3>
              <p className="max-w-xl text-[11px] font-extrabold uppercase leading-snug tracking-[0.12em] text-black sm:text-right md:text-xs">
                {hubCount} countries · one network · {hubCount} hubs
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {GLOBAL_REACH_LOCATIONS.map((loc) => {
                const active = activeId === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveId(loc.id)}
                    className={`reach-map-hub-chip ${active ? "reach-map-hub-chip--active" : ""}`}
                  >
                    <span className="reach-map-hub-chip__dot" aria-hidden />
                    <span className="reach-map-hub-chip__name">{loc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
