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

/** Great-circle-style hub arcs in the same coordinate space as markers (decorative). */
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
      width={32}
      height={40}
      viewBox="0 0 32 40"
      className={`overflow-visible ${
        active
          ? "drop-shadow-[0_0_12px_rgba(249,115,22,0.75)]"
          : "drop-shadow-[0_0_7px_rgba(249,115,22,0.45)]"
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
            Hubs in North America and the Caribbean — cold-chain routes to 42
            ports worldwide. Explore active markets on the map.
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
                {GLOBAL_REACH_MARKERS.length} markets
              </span>
            </div>

            <div className="relative aspect-[2/1] w-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(15,35,65,0.15),rgba(10,22,40,0.92))]" />
              <Image
                src="/global-reach-map.png"
                alt="World map showing Ruby Seas market coverage"
                fill
                className="object-contain object-center opacity-[0.92]"
                sizes="(max-width: 1024px) 100vw, 960px"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_68%_58%_at_50%_50%,transparent_0%,rgba(2,12,28,0.42)_88%)]"
                aria-hidden
              />
              <div
                className="animate-global-map-scan pointer-events-none absolute left-0 right-0 z-[2] h-[14%] bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-navy-950/45 via-transparent to-cyan-500/[0.07]" />

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
                    stroke="rgba(56, 197, 176, 0.45)"
                    strokeWidth={0.35}
                    strokeLinecap="round"
                    strokeDasharray="1.2 1.8"
                    className="animate-route-dash"
                    style={{ strokeDashoffset: 0 }}
                  />
                ))}
              </svg>

              {GLOBAL_REACH_MARKERS.map((m) => {
                const pos = project(m.coordinates[0], m.coordinates[1]);
                const isOn = selectedId === m.id || hoveredId === m.id;
                const showLabel = isOn;
                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    aria-label={`${m.name}, ${m.region}`}
                    aria-pressed={selectedId === m.id}
                    className="absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col-reverse items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-seafoam-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
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
                      scale: isOn ? 1.06 : 1,
                    }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  >
                    <span className="relative">
                      <MapPinIcon active={isOn} />
                      <span
                        className={`pointer-events-none absolute -top-1 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border border-amber-400/25 ${
                          isOn ? "opacity-50" : "opacity-30"
                        }`}
                      >
                        <span className="absolute inset-0 animate-ping rounded-full border border-amber-400/20" />
                      </span>
                    </span>
                    <AnimatePresence>
                      {showLabel ? (
                        <motion.span
                          key="label"
                          role="tooltip"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 2 }}
                          transition={{ duration: 0.15 }}
                          className="mb-0.5 max-w-[9.5rem] rounded-md border border-white/20 bg-navy-950/95 px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm sm:max-w-[11rem] sm:text-xs sm:normal-case sm:tracking-normal"
                        >
                          {m.name}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
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

          <aside
            className="flex max-h-[min(70vh,520px)] flex-col rounded-2xl border border-navy-700/80 bg-navy-900/60 p-4 backdrop-blur-sm lg:sticky lg:top-28"
            aria-label="Market directory"
          >
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
                          aria-pressed={selectedId === m.id}
                          onMouseEnter={() => setHoveredId(m.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() =>
                            setSelectedId(selectedId === m.id ? null : m.id)
                          }
                          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            selectedId === m.id
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
