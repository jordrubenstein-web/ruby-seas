"use client";

import Image from "next/image";
import { SITE_LOCKUP_WHITE } from "@/lib/constants";

type Props = {
  className?: string;
};

/** Static lockup while the 3D chunk loads or when reduced motion is preferred. */
export function FlatLogoFallback({ className = "" }: Props) {
  return (
    <Image
      src={SITE_LOCKUP_WHITE.src}
      alt={SITE_LOCKUP_WHITE.alt}
      width={SITE_LOCKUP_WHITE.width}
      height={SITE_LOCKUP_WHITE.height}
      priority
      className={`mx-auto h-auto w-full max-w-full object-contain drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)] ${className}`}
      sizes="(max-width: 768px) 92vw, 42rem"
    />
  );
}
