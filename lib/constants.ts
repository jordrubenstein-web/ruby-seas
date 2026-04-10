export const SITE_NAME = "Ruby Seas International";

/** Full wordmark + emblem (see `public/ruby-seas-logo.png`). Footer / print use. */
export const SITE_LOGO = {
  src: "/ruby-seas-logo.png",
  alt: "Ruby Seas International Inc.",
  width: 1024,
  height: 559,
} as const;

/** Circular fish/globe mark — white on transparent (`public/ruby-seas-emblem-white.png`). */
export const SITE_EMBLEM = {
  src: "/ruby-seas-emblem-white.png",
  alt: "",
  width: 405,
  height: 370,
} as const;

/** Aerial ocean surface — scenic B-roll (Pexels #3045163). Override with `NEXT_PUBLIC_HERO_VIDEO_URL`. */
export const DEFAULT_HERO_VIDEO = {
  hd: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
  sd: "https://videos.pexels.com/video-files/3045163/3045163-sd_640_360_25fps.mp4",
} as const;

export const HERO_POSTER_IMAGE =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85";

/** Subtle deep-sea texture over hero video (`public/header-sea-texture.jpg`). */
export const HERO_SEA_TEXTURE = "/header-sea-texture.jpg";

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/traceability", label: "Traceability" },
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

export const TRACEABILITY_STEPS = [
  {
    title: "Harvest",
    description: "Diver-caught from sustainable fisheries",
  },
  {
    title: "Process",
    description: "Single-frozen at our Bahamas facility. No chemicals.",
  },
  {
    title: "Certify",
    description: "MSC chain-of-custody verified",
  },
  {
    title: "Ship",
    description: "Cold-chain monitored across 42 ports",
  },
  {
    title: "Scan",
    description:
      "QR code on every retail package — know exactly where your seafood came from",
  },
] as const;

export const LOCATIONS = [
  {
    id: "toronto",
    name: "Toronto, ON",
    role: "Global HQ & Cold Chain",
    x: 28,
    y: 32,
  },
  {
    id: "buffalo",
    name: "Buffalo, NY",
    role: "US Distribution Hub",
    x: 26,
    y: 35,
  },
  {
    id: "miami",
    name: "Southeast US",
    role: "Regional Operations",
    x: 25,
    y: 48,
  },
  {
    id: "bahamas",
    name: "Abaco, Bahamas",
    role: "Processing Facility",
    x: 27,
    y: 52,
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
