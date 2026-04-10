"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  cardReveal,
  fadeUp,
  scaleSectionOrchestration,
  staggerOnly,
  viewportOnce,
} from "@/lib/animations";
import {
  STATS,
  STATS_BG_VIDEO,
  STATS_SECTION_POSTER_IMAGE,
} from "@/lib/constants";
import { AnimatedStat } from "@/components/home/StatsRibbon";

export function ScaleStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const statsGridInView = useInView(statsGridRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -8% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.88, 0.94, 0.9]);
  const statsY = useTransform(scrollYProgress, [0.08, 0.28], [36, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0.35, 1]);

  return (
    <section ref={sectionRef} className="section-py relative overflow-hidden">
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={STATS_SECTION_POSTER_IMAGE}
          aria-hidden
        >
          <source src={STATS_BG_VIDEO.hd} type="video/mp4" />
          <source src={STATS_BG_VIDEO.sd} type="video/mp4" />
        </video>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/82 via-navy-900/78 to-navy-950/85"
        style={{ opacity: scrimOpacity }}
        aria-hidden
      />

      <motion.div
        id="scale-stats-focus"
        className="relative z-10 mx-auto max-w-content scroll-mt-28 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleSectionOrchestration}
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-display text-3xl font-bold text-white drop-shadow-sm md:text-4xl"
        >
          Scale you can measure
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-200"
        >
          Integrity, transparency, and operational throughput — verified across
          shipments, ports, and partner programs.
        </motion.p>
        <motion.div
          ref={statsGridRef}
          variants={staggerOnly}
          className="mt-12 grid grid-cols-2 gap-4 will-change-transform lg:grid-cols-4 lg:gap-6"
          style={{ y: statsY, opacity: statsOpacity }}
        >
          {STATS.map((s, index) => (
            <motion.div key={s.label} variants={cardReveal} className="h-full">
              <AnimatedStat
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                variant="dark"
                staggerIndex={index}
                startWhen={statsGridInView}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
