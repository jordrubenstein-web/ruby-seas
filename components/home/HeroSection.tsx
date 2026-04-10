"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeUp } from "@/lib/animations";
import { DEFAULT_HERO_VIDEO, HERO_POSTER_IMAGE } from "@/lib/constants";

const CUSTOM_HERO_VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim();

export function HeroSection() {
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showVideo = motionOk;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
            autoPlay
            muted
            playsInline
            loop
            poster={HERO_POSTER_IMAGE}
            preload="metadata"
            aria-hidden
          >
            {CUSTOM_HERO_VIDEO ? (
              <source src={CUSTOM_HERO_VIDEO} type="video/mp4" />
            ) : (
              <>
                <source
                  src={DEFAULT_HERO_VIDEO.sd}
                  type="video/mp4"
                  media="(max-width: 768px)"
                />
                <source src={DEFAULT_HERO_VIDEO.hd} type="video/mp4" />
              </>
            )}
          </video>
        ) : (
          <Image
            src={HERO_POSTER_IMAGE}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/92 via-navy-900/78 to-navy-900/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,transparent_20%,rgba(15,23,42,0.55)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-content flex-col justify-center px-4 pb-32 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400"
          >
            Global seafood enterprise
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-white drop-shadow-sm"
          >
            From Ocean to Table.
            <br />
            <span className="text-seafoam-400">Verified at Every Mile.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-slate-200/90 drop-shadow-sm"
          >
            Ruby Seas supplies 190+ premium seafood products to 145 partners
            across 42 ports worldwide — with full-chain traceability you can
            scan.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <CTAButton href="/get-a-quote" variant="primary">
              Get a Quote
            </CTAButton>
            <CTAButton href="/products" variant="ghost">
              Explore Our Products
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
