"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GLOBAL_REACH_MARKERS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

/** Equirectangular → % positions inside a 2:1 map frame (matches flat world maps). */
function project(lon: number, lat: number) {
  const left = ((lon + 180) / 360) * 100;
  const top = ((90 - lat) / 180) * 100;
  return { left: `${left}%`, top: `${top}%` };
}

function projectPct(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

/** Hub routes — static, low-contrast lines only. */
const HUB_ROUTES: readonly (readonly [readonly [number, number], readonly [number, number]])[] =
  [
    [[-79.3832, 43.6532], [55.27, 25.2]] as const,
    [[-78.8784, 42.8864], [55.27, 25.2]] as const,
    [[-77.1, 26.4], [-79.3832, 43.6532]] as const,
    [[-98.35, 39.5], [-78.8784, 42.8864]] as const,
  ] as const;

function routePathD(
  a: readonly [number, number],
  b: readonly [number, number],
): string {
  const p1 = projectPct(a[0], a[1]);
  const p2 = projectPct(b[0], b[1]);
  const cx = (p1.x + p2.x) / 2;
  const cy = Math.min(p1.y, p2.y) - 6;
  return `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`;
}

function MapPinIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={28}
      height={36}
      viewBox="0 0 32 40"
      className={`overflow-visible ${
        active ? "drop-shadow-[0_2px_6px_rgba(249,115,22,0.5)]" : ""
      }`}
      aria-hidden
    >
      <path
        d="M16 1.5C8.9 1.5 3 7.4 3 14.5c0 8.5 13 22.8 13 22.8s13-14.3 13-22.8C29 7.4 23.1 1.5 16 1.5z"
        fill={active ? "#ea580c" : "#f97316"}
        stroke="rgba(254, 215, 170, 0.95)"
        strokeWidth={1.1}
      />
      <circle cx="16" cy="15" r={3.8} fill="white" />
    </svg>
  );
}

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
            ports worldwide. Explore active markets on the map.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start lg:gap-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/50 shadow-lg backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
            <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/10 bg-navy-950/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-seafoam-300">
                Network
              </span>
              <span className="rounded-lg border border-white/10 bg-navy-950/85 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                {GLOBAL_REACH_MARKERS.length} markets
              </span>
            </div>

            <div className="relative aspect-[2/1] w-full bg-navy-950/40">
              <Image
                src="/global-reach-map.png"
                alt="World map showing Ruby Seas market coverage"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 960px"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/4 bg-gradient-to-t from-navy-950/35 to-transparent"
                aria-hidden
              />

              <svg
                className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {HUB_ROUTES.map(([from, to], i) => (
                  <path
                    key={`${i}-${from[0]}`}
                    d={routePathD(from, to)}
                    fill="none"
                    stroke="rgba(86, 197, 176, 0.22)"
                    strokeWidth={0.32}
                    strokeLinecap="round"
                    strokeDasharray="1.4 2"
                  />
                ))}
              </svg>

              {GLOBAL_REACH_MARKERS.map((m) => {
                const pos = project(m.coordinates[0], m.coordinates[1]);
                const isOn = selectedId === m.id || hoveredId === m.id;
                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    aria-label={`${m.name}, ${m.region}`}
                    aria-pressed={selectedId === m.id}
                    className="absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col-reverse items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                    style={{ left: pos.left, top: pos.top }}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() =>
                      setSelectedId(selectedId === m.id ? null : m.id)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(selectedId === m.id ? null : m.id);
                      }
                    }}
                    initial={false}
                    animate={{
                      scale: isOn ? 1.04 : 1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <MapPinIcon active={isOn} />
                    <span
                      role="tooltip"
                      className={`mb-0.5 max-w-[7.5rem] rounded-md px-1.5 py-0.5 text-center text-[9px] font-semibold leading-tight text-white shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:max-w-[9rem] sm:px-2 sm:py-1 sm:text-[10px] md:max-w-[10rem] md:text-[11px] ${
                        isOn
                          ? "border border-seafoam-400/50 bg-navy-950/92 ring-1 ring-seafoam-400/25"
                          : "border border-white/20 bg-navy-950/80"
                      } ${isOn ? "block" : "hidden md:block"}`}
                    >
                      {m.name}
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
                  className="absolute bottom-3 left-3 right-3 z-20 rounded-xl border border-white/10 bg-navy-950/95 p-4 shadow-lg backdrop-blur-md sm:left-auto sm:right-3 sm:w-72"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-seafoam-400">
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
