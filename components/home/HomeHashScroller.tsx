"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** After navigation to `/` with a hash, scroll matching `id` into view. */
export function HomeHashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollToHash = () => {
      const raw = window.location.hash;
      if (!raw || raw === "#") return;
      const id = raw.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToHash();
    const t = window.setTimeout(scrollToHash, 50);
    const t2 = window.setTimeout(scrollToHash, 200);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
