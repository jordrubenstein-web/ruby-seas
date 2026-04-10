export const SITE_NAME = "Ruby Seas International";

/**
 * Horizontal lockup, transparent PNG. Update source + regenerate:
 * `public/ruby-seas-lockup-source-light.png` then `python3 scripts/lockup-remove-white-bg.py`
 */
export const SITE_LOGO = {
  src: "/ruby-seas-lockup-transparent.png",
  alt: "Ruby Seas International Inc.",
  width: 740,
  height: 208,
} as const;

/** Navbar / drawer / splash — same asset. */
export const SITE_LOCKUP_WHITE = {
  src: "/ruby-seas-lockup-transparent.png",
  alt: "Ruby Seas International Inc.",
  width: 740,
  height: 208,
} as const;

/**
 * Default hero: open-ocean schooling fish (Pexels #20567455, Magda Ehlers).
 * Override with `NEXT_PUBLIC_HERO_VIDEO_URL` for self-hosted 4K masters.
 */
export const DEFAULT_HERO_VIDEO = {
  sd: "https://videos.pexels.com/video-files/20567455/20567455-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/20567455/20567455-hd_1920_1080_60fps.mp4",
  uhd: "https://videos.pexels.com/video-files/20567455/20567455-uhd_2560_1440_60fps.mp4",
} as const;

/** Home splash: open-ocean schooling fish (Pexels #20567455) — ocean/seafood, not unrelated B-roll. */
export const SPLASH_BG_VIDEO = {
  sd: "https://videos.pexels.com/video-files/20567455/20567455-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/20567455/20567455-hd_1920_1080_60fps.mp4",
} as const;

/** Local file — avoids dead/blocked Unsplash URLs for video `poster` / reduced motion. */
export const SPLASH_POSTER_IMAGE = "/video-posters/splash.jpg";

/**
 * “Scale you can measure” — glowing jellyfish / deep water (Pexels #5136532).
 * (Plan clip #5537790 is not served from Pexels CDN in this environment.)
 */
export const STATS_BG_VIDEO = {
  sd: "https://videos.pexels.com/video-files/5136532/5136532-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/5136532/5136532-hd_1920_1080_30fps.mp4",
} as const;

export const STATS_SECTION_POSTER_IMAGE = "/video-posters/stats.jpg";

/** Shoreline / drone waves — About “Scale” narrative + optional B-roll (Pexels #3662936). */
export const SHORELINE_DRONE_VIDEO = {
  sd: "https://videos.pexels.com/video-files/3662936/3662936-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/3662936/3662936-hd_1920_1080_30fps.mp4",
} as const;

/**
 * Global Reach operations panel — crabs at the shoreline / intertidal zone (Pexels #14171914).
 */
export const OPS_PANEL_BG_VIDEO = {
  sd: "https://videos.pexels.com/video-files/14171914/14171914-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/14171914/14171914-hd_1920_1080_30fps.mp4",
} as const;

export const OPS_PANEL_POSTER_IMAGE = "/video-posters/ops.jpg";

/**
 * Deep reef / marine environment plate — About Act 1 + base layer for Why Ruby Seas (Pexels #3571264).
 */
export const DEEP_REEF_MARINE_VIDEO = {
  sd: "https://videos.pexels.com/video-files/3571264/3571264-sd_960_540_30fps.mp4",
  hd: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
} as const;

/** Poster / reduced-motion fallback — underwater marine (local asset). */
export const HERO_POSTER_IMAGE = "/video-posters/hero.jpg";

/** Subtle deep-sea texture over hero video (`public/header-sea-texture.jpg`). */
export const HERO_SEA_TEXTURE = "/header-sea-texture.jpg";

/** Why Ruby Seas — deep reef / marine plate (Pexels #3571264). */
export const WHY_RUBY_SEAS_BG_VIDEO = DEEP_REEF_MARINE_VIDEO;

/** Poster for Why Ruby Seas video / reduced-motion fallback (generic marine; swap for a crab frame if desired). */
export const WHY_RUBY_SEAS_POSTER_IMAGE = HERO_POSTER_IMAGE;

/** Home sections that participate in scroll-spy + hash nav (order = page order). */
export const HOME_SCROLL_SPY_HREFS = [
  "/#site-splash",
  "/#who-we-serve",
  "/#scale-stats",
  "/#core-products",
  "/#why-ruby-seas",
] as const;

export const NAV_LINKS = [
  { href: "/#site-splash", label: "Home" },
  { href: "/#who-we-serve", label: "Who we serve" },
  { href: "/#scale-stats", label: "Scale you can measure" },
  { href: "/#core-products", label: "Products" },
  { href: "/#why-ruby-seas", label: "Why Ruby Seas" },
  { href: "/foodservice", label: "Foodservice" },
  { href: "/retail", label: "Retail" },
  { href: "/about", label: "About" },
] as const;

export const STATS = [
  { value: 14250, suffix: "", label: "Shipments Completed" },
  { value: 42, suffix: "", label: "Global Ports Served" },
  { value: 190, suffix: "+", label: "Products in Catalog" },
  { value: 145, suffix: "+", label: "Active Partners" },
] as const;

/** Core species programs — home grid + /products (Website Part 1). */
export const PRODUCT_CATEGORIES = [
  {
    id: "na-lobster",
    title: "North American Lobster",
    description:
      "Hard-shell and new-shell programs from Canada and Maine — graded for yield, built for consistent foodservice and retail supply.",
    badge: "Canada / Maine",
    image:
      "https://images.unsplash.com/photo-1551463682-189bf47449d0?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "North American lobster on ice",
  },
  {
    id: "caribbean-lobster",
    title: "Caribbean Lobster (Ruby Seas brand)",
    description:
      "Bahamas spiny lobster under the Ruby Seas brand — diver-caught, cold-chain disciplined, and positioned for premium retail and foodservice.",
    badge: "Bahamas",
    image:
      "https://images.unsplash.com/photo-1585546247643-14e9deb7c998?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Caribbean spiny lobster",
  },
  {
    id: "snow-crab",
    title: "Snow Crab",
    description:
      "Norwegian and Canadian snow crab clusters and sections — sized, glazed, and packed for high-yield recovery in North American markets.",
    badge: "Canada & Norway",
    image:
      "https://images.unsplash.com/photo-1677643612277-1509dce0b697?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Snow crab clusters and legs on ice",
  },
  {
    id: "king-crab",
    title: "King Crab",
    description:
      "Red and blue king crab from Alaska and Norway — long-leg and section programs for distributors who need reliable spec and supply.",
    badge: "Alaska & Norway",
    image:
      "https://images.unsplash.com/photo-1759823338953-0763ee0428fb?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "King crab legs on ice at market",
  },
  {
    id: "southern-king-crab",
    title: "Southern King Crab",
    description:
      "Argentine and Chilean southern king crab — a differentiated crab line for operators looking beyond traditional Alaskan supply.",
    badge: "Argentina & Chile",
    image:
      "https://images.unsplash.com/photo-1561361398-b2bc9f049851?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Southern king crab (centolla) on the shore",
  },
  {
    id: "jonah-crab",
    title: "Jonah Crab",
    description:
      "Atlantic Jonah crab bodies, claws, and cocktail programs — sourced from Canadian fisheries for consistent sizing and flavor.",
    badge: "Canada",
    image:
      "https://images.unsplash.com/photo-1645588904198-75b8a3ed9f9d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Atlantic crab on coastal rock",
  },
  {
    id: "dungeness-crab",
    title: "Dungeness Crab",
    description:
      "Pacific Dungeness from Alaska and Washington — whole cooked, sections, and meat packs for west-coast menus and national distribution.",
    badge: "Alaska / Washington",
    image:
      "https://images.unsplash.com/photo-1691345043485-85a4b873a5b7?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Dungeness crab on a dock by the water",
  },
] as const;

export const WHY_RUBY_SEAS_PILLARS = [
  {
    id: "infrastructure",
    title: "Global Infrastructure",
    body: "A strategically positioned international presence across North America, Europe, and the Caribbean enables efficient sourcing, logistics, and market access.",
  },
  {
    id: "leadership",
    title: "Category Leadership",
    body: "A recognized leader in the North American lobster market with significant share and consistent supply capabilities.",
  },
  {
    id: "crab",
    title: "Premier Crab Sourcing",
    body: "Among the leading importers of Norwegian snow crab and king crab into the United States, with established supplier relationships.",
  },
  {
    id: "reach",
    title: "International Reach",
    body: "Serving customers across a broad global footprint with the capability to support both domestic and export markets.",
  },
  {
    id: "expertise",
    title: "Proven Industry Expertise",
    body: "Decades of experience in seafood procurement, processing, and international trade.",
  },
] as const;

export const CONTACT = {
  international: {
    name: "Ruby Seas International Inc.",
    address: "2825 Bathurst Street, Unit 2",
    city: "Toronto, Ontario, Canada M6B 3A4",
    phone: "(416) 787-3474",
    fax: "(416) 787-2896",
  },
  usa: {
    name: "Ruby Seas USA Inc.",
    address: "370 Franklin Street, Unit 2",
    city: "Buffalo, NY, USA 14202",
    phone: "(716) 768-3005",
    alt: "(609) 618-0150",
  },
  retail: {
    name: "Ruby Seas Retail",
    phone: "(416) 787-3474",
    fax: "(416) 787-2896",
  },
} as const;
