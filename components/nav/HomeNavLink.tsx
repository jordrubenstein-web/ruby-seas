"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SectionProps = {
  href: `/#${string}`;
  className: string;
  children: ReactNode;
  /** e.g. close mobile drawer */
  onNavigate?: () => void;
};

/**
 * In-page section link on home. On `/`, smooth-scroll + `replaceState`; other routes use normal navigation + hash scroll.
 */
export function HomeSectionLink({ href, className, children, onNavigate }: SectionProps) {
  const pathname = usePathname();
  const id = href.slice(2);

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/") {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", href);
        }
      }}
    >
      {children}
    </Link>
  );
}

type SplashProps = Omit<SectionProps, "href">;

/** Logo / home entry that always targets the splash. */
export function HomeNavLink({ className, children, onNavigate }: SplashProps) {
  return (
    <HomeSectionLink href="/#site-splash" className={className} onNavigate={onNavigate}>
      {children}
    </HomeSectionLink>
  );
}
