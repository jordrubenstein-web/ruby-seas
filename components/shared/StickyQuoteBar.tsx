"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function StickyQuoteBar() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 120) setVisible(false);
      else setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-navy-800/25 bg-navy-950/75 backdrop-blur-sm transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-1.5 px-4 py-2 sm:flex-row sm:gap-4 sm:px-6 sm:py-2 lg:px-8">
        <p className="text-center text-xs text-slate-400 sm:text-left">
          Ready to source premium seafood?{" "}
          <span className="font-medium text-slate-300">
            Request pricing in one business day.
          </span>
        </p>
        <Link
          href="/get-a-quote"
          className="shrink-0 rounded-full bg-seafoam-600/90 px-4 py-1.5 text-xs font-semibold text-white/95 shadow-sm transition hover:bg-seafoam-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam-400"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
