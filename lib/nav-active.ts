import { HOME_SCROLL_SPY_HREFS } from "@/lib/constants";

const SPY_HREFS = HOME_SCROLL_SPY_HREFS as readonly string[];

/** Which home “section” nav target is active for highlighting (scroll spy + hash fallback). */
export function getEffectiveHomeSectionHref(
  pathname: string,
  hash: string,
  spyHref: string | null,
): string | null {
  if (pathname !== "/") return null;
  if (spyHref) return spyHref;
  if (!hash || hash === "#") return "/#site-splash";
  const found = HOME_SCROLL_SPY_HREFS.find((h) => h.slice(1) === hash);
  return found ?? null;
}

/** Active state for primary nav links (home hashes, scroll spy, and routes). */
export function isNavLinkActive(
  pathname: string,
  hash: string,
  href: string,
  effectiveHomeSectionHref?: string | null,
): boolean {
  if (pathname === "/" && effectiveHomeSectionHref != null && SPY_HREFS.includes(href)) {
    return effectiveHomeSectionHref === href;
  }

  if (href === "/#site-splash") {
    return pathname === "/" && (hash === "" || hash === "#site-splash");
  }
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
