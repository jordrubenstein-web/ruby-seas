"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_REACH_MARKERS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

const GlobalReachLeafletMap = dynamic(
  () =>
    import("./GlobalReachLeafletMap").then((mod) => mod.GlobalReachLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="global-reach-map-shell flex aspect-[2/1] min-h-[260px] w-full items-center justify-center bg-navy-950/90 text-sm text-slate-500"
        aria-busy
        aria-label="Loading map"
      >
        Loading map…
      </div>
    ),
  },
);

const OCEAN_BACKDROP =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80";

export function GlobalMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = selectedId ?? hoveredId;
  const active =
    GLOBAL_REACH_MARKERS.find((m) => m.id === activeId) ?? null;

  const byRegion = useMemo(() => {
    const map = new Map<string, (typeof GLOBAL_REACH_MARKERS)[number][]>();
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
            Hubs in North America and the Caribbean — cold-chain routes to 42
            ports worldwide. Pan and zoom the map, or use the directory to
            explore markets.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-lg backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
            <div className="pointer-events-none absolute left-3 top-3 z-[2000] flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/10 bg-navy-950/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-seafoam-300">
                Interactive map
              </span>
              <span className="rounded-lg border border-white/10 bg-navy-950/85 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                {GLOBAL_REACH_MARKERS.length} markets
              </span>
            </div>

            <div className="global-reach-map-shell relative aspect-[2/1] w-full min-h-[260px]">
              <GlobalReachLeafletMap
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelectId={setSelectedId}
                onHoverId={setHoveredId}
              />
            </div>

            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="pointer-events-auto absolute bottom-3 left-3 right-3 z-[2000] rounded-xl border border-white/10 bg-navy-950/95 p-4 shadow-lg backdrop-blur-md sm:left-auto sm:right-3 sm:w-72"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-seafoam-400">
                    {active.region}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    {active.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Select another marker or use the directory to explore
                    coverage.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <aside
            className="flex max-h-[min(70vh,520px)] flex-col rounded-2xl border border-white/10 bg-navy-900/55 p-4 shadow-lg backdrop-blur-sm lg:sticky lg:top-28"
            aria-label="Market directory"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
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
                          aria-pressed={selectedId === m.id}
                          onMouseEnter={() => setHoveredId(m.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() =>
                            setSelectedId(selectedId === m.id ? null : m.id)
                          }
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            selectedId === m.id
                              ? "bg-navy-800 text-white ring-1 ring-seafoam-500/35"
                              : "text-slate-200 hover:bg-navy-800/70 hover:text-white"
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
