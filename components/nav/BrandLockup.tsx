"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_EMBLEM } from "@/lib/constants";

const metallicWord =
  "bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent";

const wordShadow =
  "[text-shadow:0_0.5px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.55),0_0_20px_rgba(148,163,184,0.25)]";

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

  const line2Class = isCompact
    ? `mt-0.5 font-display text-[0.55rem] font-light uppercase leading-tight tracking-[0.2em] ${metallicWord} ${wordShadow} sm:text-[0.65rem]`
    : `mt-1 font-display text-[0.65rem] font-light uppercase leading-tight tracking-[0.22em] sm:text-xs md:text-[0.8rem] ${metallicWord} ${wordShadow}`;

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
          <span className={`${metallicWord} ${wordShadow} ${isCompact ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl"}`}>
            RUBY SEAS
          </span>
          <sup className="ml-0.5 align-super text-[0.45em] font-normal tracking-normal text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:ml-1">
            ®
          </sup>
        </p>
        <p className={line2Class}>International Inc.</p>
      </div>
    </Link>
  );
}
