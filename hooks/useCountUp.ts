"use client";

import { useEffect, useRef, useState } from "react";

export type UseCountUpOptions = {
  staggerMs?: number;
  /** When set, count-up starts when this becomes true (skips internal IntersectionObserver). */
  startWhen?: boolean;
};

/**
 * Count-up when the stat enters the viewport. Uses IntersectionObserver (not
 * Framer useInView) so it still fires when parents use transforms / motion —
 * unless `startWhen` is provided (e.g. grid wrapped in scroll-linked transforms).
 */
export function useCountUp(
  end: number,
  duration = 2000,
  options: UseCountUpOptions = {},
) {
  const { staggerMs = 0, startWhen } = options;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [run, setRun] = useState(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setRun(true);
  };

  useEffect(() => {
    if (startWhen !== undefined) return;

    const el = ref.current;
    if (!el) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      window.setTimeout(() => start(), staggerMs);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            fire();
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );
    io.observe(el);

    const safety = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh && r.bottom > 0) fire();
    }, 1800);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [staggerMs, startWhen]);

  useEffect(() => {
    if (startWhen === undefined) return;
    if (!startWhen) return;
    if (startedRef.current) return;
    const t = window.setTimeout(() => start(), staggerMs);
    return () => clearTimeout(t);
  }, [startWhen, staggerMs]);

  useEffect(() => {
    if (!run) return;
    let frame: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, end, duration]);

  return { count, ref, settled: run && count >= end };
}
