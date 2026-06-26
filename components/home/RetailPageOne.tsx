"use client";

import { motion } from "framer-motion";
import {
  RETAIL_INTRO,
  RETAIL_PARTNER_BENEFITS,
  RETAIL_SUSTAINABILITY,
  RETAIL_TRACEABILITY,
} from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const glassCard =
  "rounded-2xl border border-white/80 bg-white/60 px-6 py-7 shadow-lg shadow-navy-900/10 backdrop-blur-md ring-1 ring-navy-900/10 sm:px-8 sm:py-8";

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-seafoam-400"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionRail({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
      <span className="font-display text-4xl font-bold leading-none text-seafoam-600/70 md:text-5xl">
        {index}
      </span>
      <span className="pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-800 lg:pt-0 lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]">
        {label}
      </span>
    </div>
  );
}

export function RetailPageOne() {
  return (
    <section
      id="retail-focus"
      aria-label="Retail"
      className="relative scroll-mt-28 section-py"
    >
      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-3xl border-b border-slate-200/70 pb-14 lg:pb-16"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-seafoam-600">
              {RETAIL_INTRO.title}
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-navy-950">
              {RETAIL_INTRO.tagline}
            </h2>
          </div>
          <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-[1.0625rem] lg:mt-8 lg:text-lg">
            {RETAIL_INTRO.body}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12"
        >
          <SectionRail index="01" label={RETAIL_TRACEABILITY.title} />

          <div>
            <h3 className="font-display text-2xl font-bold text-navy-950 md:text-[1.75rem]">
              {RETAIL_TRACEABILITY.subtitle}
            </h3>
            <div className="mt-6 max-w-3xl space-y-4">
              {RETAIL_TRACEABILITY.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-sm leading-relaxed text-slate-700 md:text-[0.9375rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-navy-800">
              {RETAIL_TRACEABILITY.partnersHeading}
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {RETAIL_TRACEABILITY.partners.map((partner) => (
                <article key={partner.id} className={glassCard}>
                  <h4 className="font-display text-base font-bold text-navy-900">
                    {partner.name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {partner.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-16 grid gap-10 border-t border-slate-200/70 pt-14 lg:mt-20 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12 lg:pt-16"
        >
          <SectionRail index="02" label={RETAIL_SUSTAINABILITY.title} />

          <div>
            <div className="grid gap-5 lg:grid-cols-3">
              {RETAIL_SUSTAINABILITY.programs.map((program, i) => (
                <article key={program.id} className={`flex h-full flex-col ${glassCard}`}>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-5 font-display text-base font-bold leading-snug text-navy-950">
                    {program.name}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                    {program.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-16 lg:mt-20"
        >
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl bg-navy-900 shadow-xl shadow-navy-900/20"
          >
            <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="border-b border-white/10 px-8 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam-400">
                  Retail partnership
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white md:text-[1.75rem]">
                  {RETAIL_PARTNER_BENEFITS.title}
                </h3>
              </div>
              <ul className="grid gap-x-8 gap-y-4 px-8 py-10 sm:grid-cols-2 lg:px-10 lg:py-12">
                {RETAIL_PARTNER_BENEFITS.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-snug text-white/95"
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
