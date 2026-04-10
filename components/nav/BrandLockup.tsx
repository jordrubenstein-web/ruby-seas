import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO, SITE_LOGO_MARK } from "@/lib/constants";

type Props = {
  /** Slightly smaller mark/type for the mobile drawer. */
  compact?: boolean;
  className?: string;
  /** e.g. close mobile drawer when navigating home */
  onNavigate?: () => void;
};

/**
 * Header brand: white-inverted emblem + typographic wordmark with cool metallic gradient.
 * Emblem is clipped from `SITE_LOGO_MARK` (phase 1: shared raster) until a dedicated SVG exists.
 */
export function BrandLockup({ compact = false, className = "", onNavigate }: Props) {
  const markBox = compact
    ? "h-12 w-12"
    : "h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]";
  const line1 = compact
    ? "text-base sm:text-lg"
    : "text-lg font-bold sm:text-xl md:text-2xl";
  const line2 = compact
    ? "text-[0.5rem] tracking-[0.18em] sm:text-[0.55rem]"
    : "text-[0.55rem] tracking-[0.2em] sm:text-xs sm:tracking-[0.22em]";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`group flex min-w-0 items-center gap-2.5 sm:gap-3 md:gap-4 ${className}`}
      aria-label={SITE_LOGO.alt}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 ${markBox}`}
      >
        <Image
          src={SITE_LOGO_MARK.src}
          alt=""
          fill
          className="object-cover object-[16%_center] brightness-0 invert contrast-[1.12]"
          sizes={compact ? "48px" : "(max-width: 640px) 56px, 72px"}
          priority={!compact}
        />
      </div>
      <div
        className={`flex min-w-0 flex-col justify-center leading-none [filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.45))] ${compact ? "gap-0" : "gap-0.5"}`}
      >
        <span
          className={`font-display font-bold tracking-tight ${line1} bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent`}
        >
          RUBY SEAS
          <sup className="ml-0.5 align-super text-[0.5em] font-medium normal-case tracking-normal text-slate-200/95">
            ®
          </sup>
        </span>
        <span
          className={`font-display font-medium uppercase text-transparent ${line2} bg-gradient-to-br from-slate-200 via-white to-slate-400 bg-clip-text`}
        >
          International Inc.
        </span>
      </div>
    </Link>
  );
}
