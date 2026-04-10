"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HOME_SCROLL_SPY_HREFS, NAV_LINKS } from "@/lib/constants";
import { useLocationHash } from "@/hooks/useLocationHash";
import { useHomeSectionSpy } from "@/hooks/useHomeSectionSpy";
import { getEffectiveHomeSectionHref, isNavLinkActive } from "@/lib/nav-active";
import { BrandLockup } from "./BrandLockup";
import { HomeSectionLink } from "./HomeNavLink";
import { MobileDrawer } from "./MobileDrawer";

const SPY_COUNT = HOME_SCROLL_SPY_HREFS.length;

export function Navbar() {
  const pathname = usePathname();
  const hash = useLocationHash();
  const spyHref = useHomeSectionSpy();
  const effectiveSectionHref = getEffectiveHomeSectionHref(pathname, hash, spyHref);
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const spyLinkRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!isHome || !effectiveSectionHref) {
      setUnderline((u) => ({ ...u, visible: false }));
      return;
    }
    const idx = (HOME_SCROLL_SPY_HREFS as readonly string[]).indexOf(effectiveSectionHref);
    if (idx < 0 || !navRef.current) {
      setUnderline((u) => ({ ...u, visible: false }));
      return;
    }
    const wrap = spyLinkRefs.current[idx];
    if (!wrap) return;
    const nav = navRef.current;
    const nr = nav.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    setUnderline({
      left: wr.left - nr.left,
      width: wr.width,
      visible: true,
    });
  }, [isHome, effectiveSectionHref, hash, spyHref]);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full border-b border-navy-800/45 bg-navy-950/[0.90] backdrop-blur-md transition-shadow duration-300 ${
          solid ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 lg:gap-4 lg:px-8">
          <BrandLockup className="max-w-[min(100%,12rem)] shrink-0 transition-opacity hover:opacity-95 sm:max-w-none sm:shrink" />

          <nav
            ref={navRef}
            className="relative hidden min-w-0 flex-1 items-end justify-center gap-x-5 gap-y-1 px-1 lg:flex xl:gap-x-7 2xl:gap-x-8"
          >
            {NAV_LINKS.map((link, i) => {
              const active = isNavLinkActive(pathname, hash, link.href, effectiveSectionHref);
              const cls = `whitespace-nowrap text-[13px] font-medium transition hover:text-seafoam-400 xl:text-sm ${
                active ? "text-seafoam-400" : "text-slate-200"
              }`;
              const inner =
                link.href.startsWith("/#") ? (
                  <HomeSectionLink href={link.href as `/#${string}`} className={cls}>
                    {link.label}
                  </HomeSectionLink>
                ) : (
                  <Link href={link.href} className={cls}>
                    {link.label}
                  </Link>
                );
              if (i < SPY_COUNT) {
                return (
                  <span
                    key={link.href}
                    ref={(el) => {
                      spyLinkRefs.current[i] = el;
                    }}
                    className="inline-flex shrink-0 justify-center pb-1"
                  >
                    {inner}
                  </span>
                );
              }
              return (
                <span key={link.href} className="inline-flex shrink-0 pb-1">
                  {inner}
                </span>
              );
            })}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 z-10 h-0.5 rounded-full bg-seafoam-400 transition-[left,width,opacity] duration-300 ease-out"
              style={{
                left: underline.left,
                width: underline.width,
                opacity: underline.visible ? 1 : 0,
              }}
            />
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/get-a-quote"
              className="rounded-full bg-seafoam-500 px-2.5 py-1.5 text-[11px] font-semibold leading-none text-white shadow-md shadow-seafoam-500/15 transition hover:bg-seafoam-600 sm:px-3.5 sm:py-2 sm:text-xs"
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
