"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  INTERNATIONAL_AFFILIATES,
  INTERNATIONAL_BG_IMAGE,
  INTERNATIONAL_INTRO,
} from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const glassCard =
  "rounded-2xl border border-white/80 bg-white/55 px-6 py-8 shadow-lg shadow-navy-900/10 backdrop-blur-md ring-1 ring-navy-900/10 sm:px-10 sm:py-10";

function CapabilityList({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-8 border-t border-slate-200/90 pt-6">
      <h4 className="font-display text-base font-bold text-navy-900">
        Capabilities
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-slate-700 md:text-[0.9375rem]"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-seafoam-500"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InternationalSection() {
  return (
    <section
      id="international-focus"
      aria-label="International"
      className="relative scroll-mt-28 overflow-hidden section-py"
    >
      <div className="absolute inset-0">
        <Image
          src={INTERNATIONAL_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-center [filter:brightness(1.05)_saturate(1.15)]"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white/92"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(255,255,255,0.45),transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className={`mx-auto max-w-3xl text-center ${glassCard}`}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950 md:text-4xl">
            {INTERNATIONAL_INTRO.title}
          </h2>
          <p className="mt-4 font-display text-xl font-bold text-navy-900 md:text-2xl">
            {INTERNATIONAL_INTRO.tagline}
          </p>
          <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg">
            {INTERNATIONAL_INTRO.body}
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {INTERNATIONAL_AFFILIATES.map((affiliate) => (
            <motion.article
              key={affiliate.id}
              variants={fadeUp}
              className={`flex h-full flex-col ${glassCard}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-navy-900/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-800 backdrop-blur-sm">
                  {affiliate.region}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                {affiliate.name}
              </h3>
              <div className="mt-5 space-y-4">
                {affiliate.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-slate-700 md:text-[0.9375rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <CapabilityList items={affiliate.capabilities} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
