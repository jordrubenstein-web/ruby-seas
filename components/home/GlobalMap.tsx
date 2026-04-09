"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LOCATIONS } from "@/lib/constants";
import { fadeUp, viewportOnce } from "@/lib/animations";

export function GlobalMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <motion.section
      className="section-py bg-navy-900"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Our reach is global
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Hubs in North America and the Caribbean — cold-chain routes to 42
            ports worldwide.
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-navy-800 bg-navy-800/50">
            <svg
              viewBox="0 0 100 60"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="land" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#163056" />
                  <stop offset="100%" stopColor="#0F2341" />
                </linearGradient>
              </defs>
              <rect width="100" height="60" fill="#0A1628" />
              <ellipse cx="22" cy="28" rx="18" ry="12" fill="url(#land)" opacity="0.9" />
              <ellipse cx="48" cy="22" rx="22" ry="14" fill="url(#land)" opacity="0.85" />
              <ellipse cx="72" cy="30" rx="16" ry="10" fill="url(#land)" opacity="0.8" />
              <ellipse cx="58" cy="48" rx="10" ry="6" fill="url(#land)" opacity="0.75" />
              <path
                d="M 30 35 Q 50 25 75 40"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.25"
                strokeOpacity="0.4"
                strokeDasharray="1 1"
              />
              <path
                d="M 28 32 Q 45 20 70 38"
                fill="none"
                stroke="#3AAFA9"
                strokeWidth="0.2"
                strokeOpacity="0.35"
              />
              {LOCATIONS.map((loc) => (
                <g key={loc.id}>
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="1.2"
                    fill="#3AAFA9"
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveId(loc.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onClick={() =>
                      setActiveId(activeId === loc.id ? null : loc.id)
                    }
                  />
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="2.5"
                    fill="none"
                    stroke="#3AAFA9"
                    strokeOpacity="0.4"
                    className="animate-pulse"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-8 space-y-3 lg:mt-0">
            <p className="text-sm font-medium text-seafoam-400 lg:hidden">
              Tap a location
            </p>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActiveId(activeId === loc.id ? null : loc.id)}
                className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                  activeId === loc.id
                    ? "border-seafoam-500 bg-navy-800"
                    : "border-navy-700 bg-navy-800/40 hover:border-navy-600"
                }`}
              >
                <p className="font-display font-bold text-white">{loc.name}</p>
                <p className="text-sm text-slate-400">{loc.role}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
