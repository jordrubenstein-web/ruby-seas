"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HEADER_SEA_TEXTURE, NAV_LINKS } from "@/lib/constants";
import { BrandLockup } from "./BrandLockup";
import { MobileDrawer } from "./MobileDrawer";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-[box-shadow,border-color] duration-300 ${
          solid
            ? "border-b border-navy-800/50 shadow-lg"
            : "border-b border-transparent"
        }`}
      >
        {solid ? (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md" />
            <div
              className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
              style={{
                backgroundImage: `url(${HEADER_SEA_TEXTURE})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
              aria-hidden
            />
          </div>
        ) : null}
        <div className="relative z-10 mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <BrandLockup />

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-seafoam-400 ${
                  pathname === link.href ? "text-seafoam-400" : "text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/get-a-quote"
              className="rounded-full bg-seafoam-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-seafoam-500/20 transition hover:bg-seafoam-600 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              className="rounded-lg p-2 text-white lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
