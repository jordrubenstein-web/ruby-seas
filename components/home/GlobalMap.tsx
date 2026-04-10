"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_REACH_MARKERS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

/** Equirectangular → % positions inside a 2:1 map frame (matches flat world SVGs). */
function project(lon: number, lat: number) {
  const left = ((lon + 180) / 360) * 100;
  const top = ((90 - lat) / 180) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

const WORLD_MAP_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/e/ec/BlankMap-World.svg";

const OCEAN_BACKDROP =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80";

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = GLOBAL_REACH_MARKERS.find((m) => m.id === activeId) ?? null;

  const byRegion = useMemo(() => {
    const map = new Map<string, typeof GLOBAL_REACH_MARKERS[number][]>();
    for (const m of GLOBAL_REACH_MARKERS) {
      const list = map.get(m.region) ?? [];
      list.push(m);
      map.set(m.region, list);
    }
    return map;
  }, []);

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
          className="object-cover opacity-40"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/85 to-navy-950/95" />
        <div
          className="animate-global-map-grid absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(rgba(86,197,176,0.35) 1px, transparent 1px),
 linear-gradient(90deg, rgba(86,197,176,0.35) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Network
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Our reach is global
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Cold-chain routes and partner coverage across the Americas, Europe,
            the Middle East, Asia, and Oceania — explore active markets on the
            map.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-10">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-navy-950/70 shadow-[0_0_80px_-20px_rgba(56,197,176,0.45)] backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-wrap gap-2">
              <span className="rounded-md border border-seafoam-500/40 bg-navy-900/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-seafoam-300">
                Live network
              </span>
              <span className="rounded-md border border-white/15 bg-navy-900/80 px-2 py-1 font-mono text-[10px] text-slate-400">
                {GLOBAL_REACH_MARKERS.length} regions
              </span>
            </div>

            <div className="relative aspect-[2/1] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(15,35,65,0.2),rgba(10,22,40,0.95))]" />
              <Image
                src={WORLD_MAP_SRC}
                alt=""
                fill
                className="object-contain object-center opacity-[0.85] [filter:drop-shadow(0_0_24px_rgba(56,197,176,0.15))]"
                sizes="(max-width: 1024px) 100vw, 960px"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-cyan-500/5" />

              {GLOBAL_REACH_MARKERS.map((m) => {
                const pos = project(m.coordinates[0], m.coordinates[1]);
                const isOn = activeId === m.id;
                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    aria-label={`${m.name}, ${m.region}`}
                    className="absolute z-10 -translate-x-1/2 -translate-y-full focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                    style={{ left: pos.left, top: pos.top }}
                    onMouseEnter={() => setActiveId(m.id)}
                    onFocus={() => setActiveId(m.id)}
                    onClick={() => setActiveId(isOn ? null : m.id)}
                    initial={false}
                    animate={{
                      scale: isOn ? 1.12 : 1,
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span
                        className={`absolute h-6 w-6 rounded-full border-2 ${
                          isOn
                            ? "border-amber-400 bg-amber-500/90 shadow-[0_0_20px_rgba(251,191,36,0.65)]"
                            : "border-amber-400/90 bg-amber-500/75 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                        }`}
                      />
                      <span className="absolute h-10 w-10 animate-ping rounded-full border border-amber-400/30 opacity-40" />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute bottom-3 left-3 right-3 z-20 rounded-xl border border-white/15 bg-navy-900/95 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:right-3 sm:w-72"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-seafoam-400">
                    {active.region}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    {active.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Tap another pin or use the directory to explore coverage.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <aside className="flex max-h-[min(70vh,520px)] flex-col rounded-2xl border border-navy-700/80 bg-navy-900/60 p-4 backdrop-blur-sm lg:sticky lg:top-28">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              Directory
            </p>
            <div className="mt-3 flex-1 space-y-4 overflow-y-auto pr-1">
              {[...byRegion.entries()].map(([region, markers]) => (
                <div key={region}>
                  <p className="sticky top-0 bg-navy-900/95 py-1 text-xs font-semibold text-seafoam-400">
                    {region}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {markers.map((m) => (
                      <li key={m.id}>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveId(activeId === m.id ? null : m.id)
                          }
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            activeId === m.id
                              ? "bg-navy-800 text-white ring-1 ring-amber-400/50"
                              : "text-slate-300 hover:bg-navy-800/80 hover:text-white"
                          }`}
                        >
                          <span className="font-medium">{m.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
}
