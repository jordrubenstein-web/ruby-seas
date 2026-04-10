"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp, sectionLift, viewportOnce, viewportSection } from "@/lib/animations";
import {
  WHY_RUBY_SEAS_BG_VIDEO,
  WHY_RUBY_SEAS_PILLARS,
  WHY_RUBY_SEAS_POSTER_IMAGE,
} from "@/lib/constants";

export function WhyRubySeas() {
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <motion.section
      className="section-py relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={viewportSection}
      variants={sectionLift}
    >
      <div className="absolute inset-0">
        {motionOk ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover [filter:brightness(0.92)_saturate(1.08)]"
            autoPlay
            muted
            loop
            playsInline
            poster={WHY_RUBY_SEAS_POSTER_IMAGE}
            preload="metadata"
            aria-hidden
          >
            <source src={WHY_RUBY_SEAS_BG_VIDEO.hd} type="video/mp4" />
            <source src={WHY_RUBY_SEAS_BG_VIDEO.sd} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={WHY_RUBY_SEAS_POSTER_IMAGE}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/93 via-pearl/90 to-white/94"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(43,138,126,0.06),transparent)]" />

      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="rounded-2xl border border-white/75 bg-white/85 p-6 text-center shadow-lg shadow-navy-900/10 backdrop-blur-md ring-1 ring-navy-900/10 sm:p-8">
            <h2
              id="why-ruby-seas-focus"
              className="font-display scroll-mt-28 text-3xl font-bold tracking-tight text-navy-950 md:text-4xl"
            >
              Why Ruby Seas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-relaxed text-navy-800 md:text-lg">
              Scale, sourcing depth, and the discipline to execute across borders.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_RUBY_SEAS_PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ ...viewportOnce, amount: 0.15 }}
              variants={fadeUp}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-slate-300/70 bg-pearl/55 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm ring-1 ring-slate-900/[0.04]"
            >
              <h3 className="font-display text-lg font-bold text-navy-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
