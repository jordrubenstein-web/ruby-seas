"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_LOCKUP_WHITE } from "@/lib/constants";

type Props = {
  size?: "default" | "compact";
  className?: string;
  /** e.g. close mobile drawer after navigation */
  onNavigate?: () => void;
};

export function BrandLockup({ size = "default", className = "", onNavigate }: Props) {
  const isCompact = size === "compact";
  const lockupClass = isCompact
    ? "h-10 w-auto sm:h-11"
    : "h-12 w-auto sm:h-14 md:h-[4.25rem]";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={`group flex min-w-0 items-center ${className}`}
    >
      <Image
        src={SITE_LOCKUP_WHITE.src}
        alt={SITE_LOCKUP_WHITE.alt}
        width={SITE_LOCKUP_WHITE.width}
        height={SITE_LOCKUP_WHITE.height}
        className={`${lockupClass} shrink-0 object-contain object-left [filter:drop-shadow(0_2px_12px_rgba(0,0,0,0.45))]`}
        sizes={isCompact ? "240px" : "(max-width: 768px) 280px, 360px"}
        priority
      />
    </Link>
  );
}
