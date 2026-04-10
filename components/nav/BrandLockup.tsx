"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_EMBLEM } from "@/lib/constants";

/** Gradient fill only — never combine `text-shadow` with `bg-clip-text` / `text-transparent` (fills counters in R, O, etc.). */
const metallicWord =
  "bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent";

type Props = {
  size?: "default" | "compact";
  className?: string;
  /** e.g. close mobile drawer after navigation */
  onNavigate?: () => void;
};

export function BrandLockup({ size = "default", className = "", onNavigate }: Props) {
  const isCompact = size === "compact";
  const emblemClass = isCompact
    ? "h-11 w-auto sm:h-12"
    : "h-14 w-auto sm:h-16 md:h-[4.25rem]";

  const line1Size = isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl";
  const line2Size = isCompact
    ? "text-[0.55rem] sm:text-[0.65rem]"
    : "text-[0.65rem] sm:text-xs md:text-[0.8rem]";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`group flex min-w-0 items-center gap-2.5 sm:gap-3 md:gap-4 ${className}`}
    >
      <Image
        src={SITE_EMBLEM.src}
        alt={SITE_EMBLEM.alt}
        width={SITE_EMBLEM.width}
        height={SITE_EMBLEM.height}
        aria-hidden
        className={`${emblemClass} shrink-0 object-contain object-left [filter:drop-shadow(0_2px_12px_rgba(0,0,0,0.45))]`}
        sizes={isCompact ? "64px" : "(max-width: 768px) 72px, 88px"}
        priority
      />
      <div className="min-w-0 leading-none">
        <p className="font-display font-bold uppercase leading-none tracking-tight sm:tracking-tight">
          <span
            className={`inline-block [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.55))] ${line1Size}`}
          >
            <span className={metallicWord}>RUBY SEAS</span>
          </span>
          <sup className="ml-0.5 align-super text-[0.45em] font-normal tracking-normal text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.5))] sm:ml-1">
            ®
          </sup>
        </p>
        <p
          className={`mt-0.5 font-display font-light uppercase leading-tight tracking-[0.2em] sm:mt-1 sm:tracking-[0.22em] ${line2Size}`}
        >
          <span className="inline-block [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.45))]">
            <span className={metallicWord}>International Inc.</span>
          </span>
        </p>
      </div>
    </Link>
  );
}
