"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HOME_SCROLL_SPY_HREFS } from "@/lib/constants";

/** ~Fixed header; aligns with scroll-margin / nav height. */
const HEADER_BAND_PX = 96;

/**
 * An anchor “counts” when its top is at or above this line from the viewport top.
 * Using only `top <= ~104px` (equivalent to `scrollY + tinyOffset`) lags one section:
 * the next heading can fill the screen while the previous tab stays active.
 */
function activationLinePx(): number {
  const thresholdPx = Math.min(Math.max(window.innerHeight * 0.38, 280), 520);
  return HEADER_BAND_PX + thresholdPx;
}

function computeActiveSpyHref(): (typeof HOME_SCROLL_SPY_HREFS)[number] {
  const line = activationLinePx();
  let active: (typeof HOME_SCROLL_SPY_HREFS)[number] = HOME_SCROLL_SPY_HREFS[0];
  for (const href of HOME_SCROLL_SPY_HREFS) {
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= line) active = href;
  }
  return active;
}

/**
 * On the homepage, which primary section nav target is “current” while scrolling.
 * Returns `null` off home or before first client measurement.
 */
export function useHomeSectionSpy(): (typeof HOME_SCROLL_SPY_HREFS)[number] | null {
  const pathname = usePathname();
  const [active, setActive] = useState<(typeof HOME_SCROLL_SPY_HREFS)[number] | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const sync = () => setActive(computeActiveSpyHref());
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  return pathname === "/" ? active : null;
}
