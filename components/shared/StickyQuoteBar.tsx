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
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-seafoam-500/30 bg-navy-950/95 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-4 py-3.5 sm:flex-row sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
        <p className="text-center text-sm leading-snug text-slate-200 sm:text-left sm:text-base">
          Receive a quote within one business day.
        </p>
        <Link
          href="/get-a-quote"
          className="shrink-0 rounded-full bg-seafoam-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-seafoam-500/25 transition hover:bg-seafoam-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seafoam-400"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
