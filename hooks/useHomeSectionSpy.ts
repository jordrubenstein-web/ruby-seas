"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HOME_SCROLL_SPY_HREFS } from "@/lib/constants";

/** Viewport line from top: sticky header + small offset (px). */
const HEADER_ANCHOR_OFFSET = 92;

function computeActiveSpyHref(): (typeof HOME_SCROLL_SPY_HREFS)[number] {
  const y = window.scrollY + HEADER_ANCHOR_OFFSET;
  let active: (typeof HOME_SCROLL_SPY_HREFS)[number] = HOME_SCROLL_SPY_HREFS[0];
  for (const href of HOME_SCROLL_SPY_HREFS) {
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) active = href;
    else break;
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
