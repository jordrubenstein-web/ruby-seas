"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeUp } from "@/lib/animations";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85";

/** Set `NEXT_PUBLIC_HERO_VIDEO_URL` to a muted MP4/WebM for looping B-roll (e.g. facility / ocean). */
const HERO_VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            poster={HERO_IMAGE}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/75 to-navy-900/50" />
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
            className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-white"
          >
            From Ocean to Table.
            <br />
            <span className="text-seafoam-400">Verified at Every Mile.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-slate-200/90"
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
