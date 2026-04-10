"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE_LOGO } from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={onClose}
      />
      <aside
        aria-label="Site menu"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col bg-navy-900 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-navy-800 px-4 py-4 sm:px-6 sm:py-5">
          <Link
            href="/"
            onClick={onClose}
            className="min-w-0 flex-1 rounded-lg bg-white/95 px-2 py-1.5 ring-1 ring-white/10"
          >
            <Image
              src={SITE_LOGO.src}
              alt={SITE_LOGO.alt}
              width={SITE_LOGO.width}
              height={SITE_LOGO.height}
              className="h-8 w-auto max-w-full object-contain object-left"
              sizes="240px"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-navy-800 hover:text-white"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 hover:bg-navy-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/get-a-quote"
            onClick={onClose}
            className="mt-4 rounded-full bg-seafoam-500 py-3 text-center text-sm font-semibold text-white hover:bg-seafoam-600"
          >
            Get a Quote
          </Link>
        </nav>
      </aside>
    </>
  );
}
