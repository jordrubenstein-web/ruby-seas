"use client";

import { useEffect, useState } from "react";

/** Syncs with `window.location.hash` (client only). */
export function useLocationHash(): string {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return hash;
}
