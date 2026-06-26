import Image from "next/image";
import { RETAIL_BG_IMAGE } from "@/lib/constants";

export function RetailSectionBackdrop() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src={RETAIL_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-center [filter:brightness(1.08)_saturate(0.88)]"
          sizes="100vw"
          priority={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/93 via-white/90 to-white/93"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_18%,rgba(255,255,255,0.5),transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(248,249,250,0.65),transparent_55%)]"
        aria-hidden
      />
    </>
  );
}
