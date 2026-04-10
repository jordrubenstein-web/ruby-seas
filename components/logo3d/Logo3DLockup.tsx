"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_NAME } from "@/lib/constants";
import { FlatLogoFallback } from "./FlatLogoFallback";
import { Logo3DScene } from "./Logo3DScene";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** When true, show the flat PNG instead of WebGL (e.g. `prefers-reduced-motion`). */
  reducedMotion?: boolean;
};

function RubyGlyph({ className = "" }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const gradId = `rubyGradSplash-${gid}`;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M12 2 L18 10 L12 22 L6 10 Z"
        fill={`url(#${gradId})`}
        stroke="#7f1d1d"
        strokeWidth={0.4}
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="45%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo3DLockup({ reducedMotion = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      onUpdate: (self) => setScrollProgress(self.progress),
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <FlatLogoFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative z-[1] flex w-full max-w-4xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8 md:gap-10"
    >
      <div className="relative h-[220px] w-[220px] shrink-0 sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px]">
        <Logo3DScene
          scrollProgress={scrollProgress}
          className="h-full w-full touch-none [&>canvas]:!h-full [&>canvas]:!w-full"
        />
      </div>
      <div className="flex max-w-md flex-col text-center sm:text-left">
        <p className="font-display text-3xl font-bold leading-tight tracking-wide text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.75)] sm:text-4xl md:text-[2.65rem]">
          <span className="inline-flex flex-wrap items-baseline justify-center gap-0 sm:justify-start">
            <span>RUB</span>
            <span className="relative inline-block">
              Y
              <RubyGlyph className="pointer-events-none absolute bottom-[0.06em] left-1/2 h-[0.42em] w-[0.42em] -translate-x-1/2 md:h-[0.38em] md:w-[0.38em]" />
            </span>
          </span>{" "}
          SEAS
          <sup className="ml-0.5 align-super text-[0.42em] font-normal text-white/90">
            ®
          </sup>
        </p>
        <p className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-slate-200/95 drop-shadow-md sm:text-base">
          International Inc
        </p>
        <span className="sr-only">{SITE_NAME}</span>
      </div>
    </div>
  );
}
