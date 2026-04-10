"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, type ComponentType } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { GLOBAL_REACH_LOCATIONS } from "@/lib/globalReachLocations";
import type { ReachMapProps } from "./ReachMap";

const ReachMap = dynamic(
  () => import("./ReachMap").then((m) => m.ReachMap),
  {
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
  },
) as ComponentType<ReachMapProps>;

const OCEAN_BACKDROP =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80";

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const hubCount = GLOBAL_REACH_LOCATIONS.length;

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
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
          Tap a pin for the city name
        </p>

        <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-lg backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
          <button
            type="button"
            className="reach-map-reset-btn"
            onClick={() => setActiveId(null)}
          >
            RESET
          </button>
          <div className="relative z-0 h-[320px] min-h-[320px] w-full md:h-[420px] md:min-h-[420px]">
            <ReachMap activeId={activeId} onActiveIdChange={setActiveId} />
          </div>
        </div>

        <div className="reach-map-ops mt-10 rounded-2xl border border-white/10 bg-[#050B14]/90 p-5 shadow-lg ring-1 ring-black/30 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
              Operations
            </h3>
            <p className="max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-wide text-slate-500 sm:text-right">
              {hubCount} countries · one network · {hubCount} hubs
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {GLOBAL_REACH_LOCATIONS.map((loc) => {
              const active = activeId === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setActiveId(loc.id)}
                  className={`reach-map-ops-card text-left ${active ? "reach-map-ops-card--active" : ""}`}
                >
                  <span className="reach-map-ops-card__dot" aria-hidden />
                  <span className="reach-map-ops-card__name">{loc.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
