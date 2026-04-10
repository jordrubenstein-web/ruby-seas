"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import {
  DEEP_REEF_MARINE_VIDEO,
  HERO_POSTER_IMAGE,
  OPS_PANEL_BG_VIDEO,
  OPS_PANEL_POSTER_IMAGE,
  SHORELINE_DRONE_VIDEO,
  SPLASH_POSTER_IMAGE,
} from "@/lib/constants";

type ActBlock = {
  title: string;
  subtitle: string;
  body: string;
  video: { sd: string; hd: string };
  poster: string;
  /** Static image shown as subtle corner accent on the media side */
  accentImage: string;
  accentAlt: string;
};

const ACT_BLOCKS: ActBlock[] = [
  {
    title: "Origin",
    subtitle: "Built for transparency",
    body: "Founded in Canada with direct access to North Atlantic lobster and snow crab grounds, Ruby Seas was built on a single principle: the seafood industry deserves radical transparency.",
    video: DEEP_REEF_MARINE_VIDEO,
    poster: HERO_POSTER_IMAGE,
    accentImage:
      "https://images.unsplash.com/photo-1551463682-189bf47449d0?auto=format&fit=crop&w=900&q=80",
    accentAlt: "North Atlantic lobster on ice",
  },
  {
    title: "Scale",
    subtitle: "Global operations",
    body: "Today we operate from four US states, ship through 42 ports, and serve retail, wholesale, and international markets across Asia, Europe, and the Americas. Our 14,520+ shipments speak for themselves.",
    video: SHORELINE_DRONE_VIDEO,
    poster: SPLASH_POSTER_IMAGE,
    accentImage:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
    accentAlt: "Container ship at port",
  },
  {
    title: "Integrity",
    subtitle: "No shortcuts",
    body: "Every product we sell meets both EU and FDA health standards. Our Bahamas spiny lobster fishery is MSC-certified sustainable. We never use sodium metabisulfite or sodium tripolyphosphate. One freeze. Zero shortcuts.",
    video: OPS_PANEL_BG_VIDEO,
    poster: OPS_PANEL_POSTER_IMAGE,
    accentImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    accentAlt: "Fresh seafood quality",
  },
];

function ActVisual({
  video,
  poster,
  accentImage,
  accentAlt,
}: Pick<ActBlock, "video" | "poster" | "accentImage" | "accentAlt">) {
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative min-h-[260px] w-full md:min-h-[340px] lg:min-h-[380px]">
      {motionOk ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="metadata"
          aria-hidden
        >
          <source src={video.hd} type="video/mp4" />
          <source src={video.sd} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-950/65 via-navy-900/25 to-teal-800/20"
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-4 right-4 hidden w-[38%] max-w-[200px] overflow-hidden rounded-xl border border-white/25 bg-white/10 shadow-lg backdrop-blur-sm sm:block">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={accentImage}
            alt={accentAlt}
            fill
            className="object-cover"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}

export function NarrativeSection() {
  return (
    <motion.div
      className="space-y-10 lg:space-y-14"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {ACT_BLOCKS.map((act, i) => (
        <motion.article
          key={act.title}
          variants={fadeUp}
          className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04]"
        >
          <div
            className={`grid md:grid-cols-2 md:items-stretch ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
          >
            <ActVisual
              video={act.video}
              poster={act.poster}
              accentImage={act.accentImage}
              accentAlt={act.accentAlt}
            />
            <div className="flex flex-col justify-center bg-gradient-to-b from-white to-pearl/40 px-6 py-8 sm:px-8 lg:px-11 lg:py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-seafoam-600 sm:text-sm">
                Act {i + 1} — {act.title}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl md:text-[1.75rem] lg:text-4xl">
                {act.subtitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {act.body}
              </p>
              <span
                className="mt-8 hidden h-px w-16 rounded-full bg-gradient-to-r from-seafoam-500 to-seafoam-300 md:block"
                aria-hidden
              />
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
