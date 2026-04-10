"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FlatLogoFallback } from "@/components/logo3d/FlatLogoFallback";
import { Logo3DErrorBoundary } from "@/components/logo3d/Logo3DErrorBoundary";
import { SPLASH_BG_VIDEO, SPLASH_POSTER_IMAGE } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

const CUSTOM_SPLASH_VIDEO = process.env.NEXT_PUBLIC_SPLASH_VIDEO_URL?.trim();

/** WebGL splash is opt-in — avoids R3F/chunk issues on first paint. Set NEXT_PUBLIC_SPLASH_3D=1 to enable. */
const SPLASH_3D = process.env.NEXT_PUBLIC_SPLASH_3D === "1";

const Logo3DLockup = dynamic(
  () =>
    import("@/components/logo3d/Logo3DLockup").then((m) => m.Logo3DLockup),
  {
    ssr: false,
    loading: () => <FlatLogoFallback />,
  },
);

export function SplashSection() {
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="site-splash"
      aria-label="Welcome"
      className="relative min-h-[100svh] scroll-mt-0 overflow-hidden"
    >
      <div className="absolute inset-0">
        {motionOk ? (
          <video
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover [filter:brightness(1.08)_saturate(1.04)_contrast(0.97)]"
            autoPlay
            muted
            playsInline
            loop
            poster={SPLASH_POSTER_IMAGE}
            preload="metadata"
            aria-hidden
          >
            {CUSTOM_SPLASH_VIDEO ? (
              <source src={CUSTOM_SPLASH_VIDEO} type="video/mp4" />
            ) : (
              <>
                <source src={SPLASH_BG_VIDEO.hd} type="video/mp4" />
                <source src={SPLASH_BG_VIDEO.sd} type="video/mp4" />
              </>
            )}
          </video>
        ) : (
          <Image
            src={SPLASH_POSTER_IMAGE}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Radial vignette — lighter so lockup + type stay readable */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_56%_at_50%_42%,rgba(5,11,20,0.04)_0%,rgba(5,11,20,0.22)_50%,rgba(5,11,20,0.48)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/22 via-navy-900/10 to-navy-950/38"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-content flex-col px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <motion.div
            variants={fadeUp}
            className="relative w-full max-w-lg md:max-w-3xl lg:max-w-[42rem]"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120%,26rem)] w-[min(110%,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-seafoam-400/20 blur-[72px] motion-safe:animate-pulse"
              aria-hidden
            />
            {motionOk && SPLASH_3D ? (
              <Logo3DErrorBoundary
                fallback={
                  <FlatLogoFallback className="relative drop-shadow-[0_2px_18px_rgba(255,255,255,0.55),0_4px_28px_rgba(15,23,42,0.35)]" />
                }
              >
                <Logo3DLockup />
              </Logo3DErrorBoundary>
            ) : (
              <FlatLogoFallback className="relative drop-shadow-[0_2px_18px_rgba(255,255,255,0.55),0_4px_28px_rgba(15,23,42,0.35)]" />
            )}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-xl text-sm font-semibold uppercase tracking-[0.32em] text-navy-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.95),0_0_24px_rgba(255,255,255,0.5),0_2px_12px_rgba(15,23,42,0.15)] sm:text-[0.8125rem] md:text-base md:tracking-[0.38em]"
          >
            Premium Global Seafood Supply
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
