export const SITE_NAME = "Ruby Seas International";

/** Full-color wordmark + emblem, transparent PNG — footer and light backgrounds. */
export const SITE_LOGO = {
  src: "/ruby-seas-logo.png",
  alt: "Ruby Seas International Inc.",
  width: 854,
  height: 268,
} as const;

/** White silhouette of full lockup for dark / transparent navbar (same aspect as `SITE_LOGO`). */
export const SITE_LOCKUP_WHITE = {
  src: "/ruby-seas-lockup-white.png",
  alt: "Ruby Seas International Inc.",
  width: 854,
  height: 268,
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

/** Poster / reduced-motion fallback — underwater marine (matches hero mood). */
export const HERO_POSTER_IMAGE =
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90";

/** Subtle deep-sea texture over hero video (`public/header-sea-texture.jpg`). */
export const HERO_SEA_TEXTURE = "/header-sea-texture.jpg";

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
] as const;

export const STATS = [
  { value: 14520, suffix: "+", label: "Shipments Completed" },
  { value: 42, suffix: "", label: "Global Ports Served" },
  { value: 190, suffix: "+", label: "Products in Catalog" },
  { value: 145, suffix: "+", label: "Active Partners" },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    id: "fish",
    title: "Wild-Caught & Responsibly Sourced Fish",
    description:
      "Salmon, mahi mahi, grouper, swordfish, tuna, and more — sourced to EU and FDA standards. No compromises on cold-chain integrity.",
    badge: "EU / FDA",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    imageAlt: "Premium fish fillets on ice",
  },
  {
    id: "shellfish",
    title: "Premium Shellfish",
    description:
      "From North Atlantic snow crab and king crab to black tiger shrimp, scallops, and octopus — graded, sized, and shipped IQF for maximum yield.",
    badge: "IQF Graded",
    image:
      "https://images.unsplash.com/photo-1714989599705-692ee9400a3a?w=800&q=80",
    imageAlt: "Fresh crab and shellfish on ice",
  },
  {
    id: "value-added",
    title: "Value-Added & Ready Meals",
    description:
      "Retail-ready seafood mixes, tempuras, lobster crepes, paella kits, and 30+ SKUs designed for grab-and-go margins.",
    badge: "Retail Ready",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imageAlt: "Prepared seafood dishes",
  },
  {
    id: "lobster",
    title: "Bahamas Spiny Lobster (MSC-Certified)",
    description:
      "Diver-caught Panulirus argus from our own Abaco Island facility. Single-frozen. Zero chemical treatment. Full Marine Stewardship Council certification. The cleanest lobster on the market.",
    badge: "MSC Certified",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    imageAlt: "Spiny lobster",
  },
] as const;

/** Equirectangular [lon, lat] — interactive global reach map. */
export const GLOBAL_REACH_MARKERS = [
  { id: "ca", name: "Canada", region: "North America", coordinates: [-96.0, 56.0] as const },
  { id: "us", name: "United States", region: "North America", coordinates: [-98.35, 39.5] as const },
  { id: "mx", name: "Mexico", region: "North America", coordinates: [-102.0, 23.0] as const },
  { id: "bs", name: "Bahamas", region: "Caribbean", coordinates: [-77.4, 25.0] as const },
  { id: "tc", name: "Turks & Caicos", region: "Caribbean", coordinates: [-71.8, 21.8] as const },
  { id: "cu", name: "Cuba", region: "Caribbean", coordinates: [-79.5, 21.5] as const },
  { id: "jm", name: "Jamaica", region: "Caribbean", coordinates: [-77.5, 18.1] as const },
  { id: "ni", name: "Nicaragua", region: "Central America", coordinates: [-85.2, 12.9] as const },
  { id: "cr", name: "Costa Rica", region: "Central America", coordinates: [-84.1, 9.7] as const },
  { id: "pa", name: "Panama", region: "Central America", coordinates: [-80.0, 8.5] as const },
  { id: "co", name: "Colombia", region: "South America", coordinates: [-74.3, 4.6] as const },
  { id: "ec", name: "Ecuador", region: "South America", coordinates: [-78.2, -1.8] as const },
  { id: "pe", name: "Peru", region: "South America", coordinates: [-75.0, -9.2] as const },
  { id: "br", name: "Brazil", region: "South America", coordinates: [-51.9, -14.2] as const },
  { id: "cl", name: "Chile", region: "South America", coordinates: [-71.5, -35.7] as const },
  { id: "fr", name: "France", region: "Europe", coordinates: [2.35, 46.5] as const },
  { id: "es", name: "Spain", region: "Europe", coordinates: [-3.75, 40.4] as const },
  { id: "il", name: "Israel", region: "Middle East", coordinates: [34.85, 31.05] as const },
  { id: "ae", name: "Dubai", region: "Middle East", coordinates: [55.27, 25.2] as const },
  { id: "in", name: "India", region: "Asia", coordinates: [78.96, 22.0] as const },
  { id: "cn", name: "China", region: "Asia", coordinates: [104.2, 35.0] as const },
  { id: "hk", name: "Hong Kong", region: "Asia", coordinates: [114.17, 22.32] as const },
  { id: "vn", name: "Vietnam", region: "Asia", coordinates: [108.3, 14.1] as const },
  { id: "ph", name: "Philippines", region: "Asia", coordinates: [122.0, 12.9] as const },
  { id: "id", name: "Indonesia", region: "Asia", coordinates: [113.9, -2.5] as const },
  { id: "nz", name: "New Zealand", region: "Oceania", coordinates: [172.0, -41.3] as const },
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
