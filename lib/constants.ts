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

/** International section — light turquoise tropical beach (Unsplash). */
export const INTERNATIONAL_BG_IMAGE = "/international/beach.jpg";

/** Retail section — soft underwater light, cool ocean tones (Unsplash). */
export const RETAIL_BG_IMAGE = "/retail/ocean-soft.jpg";

/** Home sections that participate in scroll-spy + hash nav (order = page order). */
export const HOME_SCROLL_SPY_HREFS = [
  "/#site-splash",
  "/#scale-stats-focus",
  "/#core-products-focus",
  "/#why-ruby-seas-focus",
  "/#international-focus",
  "/#retail-focus",
] as const;

export const NAV_LINKS = [
  { href: "/#site-splash", label: "Home" },
  { href: "/#scale-stats-focus", label: "Scale" },
  { href: "/#core-products-focus", label: "Products" },
  { href: "/#why-ruby-seas-focus", label: "Why" },
  { href: "/#international-focus", label: "International" },
  { href: "/#retail-focus", label: "Retail" },
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
    title: "Caribbean Lobster",
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
    image: "/home/snow-crab.jpg",
    imageAlt: "Snow crab clusters and legs on ice",
  },
  {
    id: "king-crab",
    title: "King Crab",
    description:
      "Red and blue king crab from Alaska and Norway — long-leg and section programs for distributors who need reliable spec and supply.",
    badge: "Alaska & Norway",
    image: "/home/king-crab.jpg",
    imageAlt:
      "Cooked king crab legs on a white plate with butter, seafood cracker, and pick on a dark slate background",
  },
  {
    id: "southern-king-crab",
    title: "Southern King Crab",
    description:
      "Argentine and Chilean southern king crab — a differentiated crab line for operators looking beyond traditional Alaskan supply.",
    badge: "Argentina & Chile",
    image: "/home/southern-king-crab.jpg",
    imageAlt: "Southern king crab (centolla) on the shore",
  },
  {
    id: "jonah-crab",
    title: "Jonah Crab",
    description:
      "Atlantic Jonah crab bodies, claws, and cocktail programs — sourced from Canadian fisheries for consistent sizing and flavor.",
    badge: "Canada",
    image: "/home/jonah-crab.jpg",
    imageAlt: "Jonah crab claws on ice",
  },
  {
    id: "dungeness-crab",
    title: "Dungeness Crab",
    description:
      "Pacific Dungeness from Alaska and Washington — whole cooked, sections, and meat packs for west-coast menus and national distribution.",
    badge: "Alaska / Washington",
    image: "/home/dungeness-crab.webp",
    imageAlt: "Cooked Dungeness crab clusters on a platter with lemon and butter",
  },
  {
    id: "black-cod-sablefish",
    title: "Black Cod / Sablefish",
    description:
      "Rich, high-oil fillets from Alaska — ideal for miso-style programs, premium retail, and foodservice menus that need reliable portioning and plate presence.",
    badge: "Alaska",
    image: "/home/black-cod.jpg",
    imageAlt: "Glazed black cod fillet with sautéed greens",
  },
  {
    id: "dover-sole",
    title: "Dover Sole",
    description:
      "European flatfish from Dutch fisheries and processing — delicate flavor and consistent fillets for white-tablecloth dining and upscale retail.",
    badge: "Netherlands",
    image: "/home/dover-sole.jpg",
    imageAlt:
      "Whole pan-seared Dover sole on a white oval plate with lemon butter sauce, capers, parsley, and a lemon wedge",
  },
  {
    id: "mahi-mahi",
    title: "Mahi Mahi",
    description:
      "Firm, mild fillets and portions from the eastern Pacific — suited to grilling, tacos, and seasonal menus with steady supply from Peru and Ecuador.",
    badge: "Peru / Ecuador",
    image: "/home/mahi-mahi.jpg",
    imageAlt: "Grilled mahi mahi fillets with tropical fruit salsa",
  },
  {
    id: "swai",
    title: "Swai",
    description:
      "Mild, versatile pangasius fillets from Vietnam — value-forward programs for foodservice and retail with predictable sizing and yield.",
    badge: "Vietnam",
    image: "/home/swai-plated.jpg",
    imageAlt: "Seasoned Swai fillets with greens and sauce on a white plate",
  },
  {
    id: "tuna",
    title: "Tuna",
    description:
      "Loins, saku, and steaks from Southeast Asian supply — aligned to sushi, poke, and cooked-seafood applications with traceable documentation.",
    badge: "Vietnam / Indonesia",
    image: "/home/tuna.jpg",
    imageAlt: "Seared tuna steak with asparagus on a white plate",
  },
  {
    id: "clams",
    title: "Clams",
    description:
      "Whole and shucked clam programs from Vietnam — for chowders, pasta, and steam-table formats with disciplined grading and pack styles.",
    badge: "Vietnam",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Steamed_clams.jpg",
    imageAlt: "Steamed clams in the shell",
  },
  {
    id: "black-tiger-shrimp",
    title: "Black Tiger Shrimp",
    description:
      "Bold shell-on and peeled options from key origins — sized for retail trays, broadline packs, and operators who want visible quality and curl.",
    badge: "Nigeria / Myanmar",
    image: "/home/black-tiger-shrimp.jpg",
    imageAlt: "Raw black tiger shrimp with striped shells on slate",
  },
  {
    id: "conch",
    title: "White Shrimp",
    description:
      "Clean, mild flavor with consistent sizing and excellent value. Available peeled and shell-on from trusted origins, ideal for retail programs, foodservice, and everyday menu applications.",
    badge: "Ecuador",
    image: "/home/white-shrimp.jpg",
    imageAlt:
      "Cooked shrimp cocktail in a stemmed glass with cocktail sauce, lemon wedge, and parsley",
  },
  {
    id: "octopus",
    title: "Octopus",
    description:
      "Tender, cleaned octopus from Iberian supply chains — tentacle and whole options for tapas, salads, and grilled plates with European consistency.",
    badge: "Portugal / Spain",
    image: "/home/octopus.jpg",
    imageAlt:
      "Grilled octopus tentacles with caramelized char on a black plate, garnished with fresh herbs on a rustic wooden surface",
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
  {
    id: "compliance",
    title: "Regulatory Compliance",
    body: "Full adherence to U.S. and international seafood regulations, with strict quality control and documentation standards maintained across all products and supply chains.",
  },
] as const;

export const INTERNATIONAL_INTRO = {
  title: "International",
  tagline: "Global Expertise. Local Presence.",
  body: "Our international operations extend beyond North America, providing strategic sourcing, processing, and distribution capabilities across Europe and the Caribbean. Through our affiliated companies, Ruby Seas delivers premium seafood with exceptional quality, reliable logistics, and local market expertise.",
} as const;

export const INTERNATIONAL_AFFILIATES = [
  {
    id: "ideal-blue",
    region: "France",
    name: "Ruby Seas France",
    paragraphs: [
      "Headquartered in Nice, we serve as the European import and distribution hub, connecting seafood producers around the world with customers throughout the European Union.",
      "Acting as the vital link between sourcing regions and end markets, Ruby Seas leverages deep product expertise and the synergies between North American and European seafood markets to create value for its customers. The operation specializes in sourcing, importing, and distributing premium frozen seafood while providing personalized service and market intelligence across Europe.",
      "Today, Ruby Seas proudly serves customers in Belgium, Cyprus, Denmark, France, Germany, Greece, Italy, the Netherlands, Portugal, and the United Kingdom.",
    ],
    capabilities: [
      "European seafood import and distribution",
      "Strategic sourcing and procurement",
      "Foodservice and retail supply",
      "Market intelligence across EU seafood markets",
      "International logistics and supply chain management",
    ],
  },
  {
    id: "gl-seafood",
    region: "Bahamas",
    name: "G&L Seafood Co. Ltd.",
    paragraphs: [
      "Located in Freeport, Bahamas, G&L Seafood Co. Ltd. is a Ruby Seas joint venture, Caribbean processing and export operation. With more than 30 years of industry experience, this family-owned company has grown to become one of The Bahamas' leading seafood exporters.",
      "Working closely with licensed local fishermen, G&L Seafood sources the finest Bahamian Spiny Lobster Tails, Stone Crab Claws, and Conch Meat, processing each product to the highest international food safety and quality standards before exporting to customers around the world.",
      "Through a commitment to traceability, quality assurance, and customer satisfaction, G&L Seafood plays a critical role in delivering premium Caribbean seafood from harvest to market.",
    ],
    capabilities: [
      "Bahamian Spiny Lobster processing",
      "Stone Crab and Conch sourcing",
      "International seafood exports",
      "HACCP-compliant processing and quality assurance",
      "Private label and custom packaging",
      "Cold chain logistics and global distribution",
    ],
  },
] as const;

export const RETAIL_INTRO = {
  title: "Retail",
  tagline: "Built for Today's Retail Market",
  body: "Ruby Seas supplies premium frozen seafood to retailers across North America with a focus on quality, consistency, traceability, and responsible sourcing. We work closely with our retail partners to meet evolving food safety, labeling, and supply chain requirements while delivering dependable products and service.",
} as const;

export const RETAIL_TRACEABILITY = {
  title: "Traceability",
  subtitle: "Supply Chain Transparency",
  paragraphs: [
    "Seafood traceability continues to play an increasingly important role in the retail industry. In preparation for the FDA's Food Safety Modernization Act (FSMA) Rule 204, Ruby Seas evaluated its traceability systems with guidance from industry organizations and technology partners.",
    "Although implementation of FSMA 204 has been delayed, many major retailers already require the electronic exchange of Key Data Elements (KDEs). Ruby Seas is prepared to support these requirements and adapt as regulations continue to evolve.",
  ],
  partnersHeading: "Our Traceability Partners",
  partners: [
    {
      id: "gdst",
      name: "Global Dialogue on Seafood Traceability (GDST)",
      body: "Ruby Seas is a member of the Global Dialogue on Seafood Traceability (GDST), an international organization that develops standards for digital seafood traceability and supply chain interoperability.",
    },
    {
      id: "wholechain",
      name: "Wholechain",
      body: "Ruby Seas worked with Wholechain, a blockchain-based traceability platform, to review our supply chain and strengthen our digital traceability capabilities.",
    },
  ],
} as const;

export const RETAIL_SUSTAINABILITY = {
  title: "Sustainability",
  programs: [
    {
      id: "gsa",
      name: "Global Seafood Alliance (GSA)",
      body: "Ruby Seas has been a Corporate Member of the Global Seafood Alliance for many years, supporting responsible seafood production and supply chains worldwide.",
    },
    {
      id: "msc",
      name: "Marine Stewardship Council (MSC)",
      body: "Ruby Seas maintains MSC Chain of Custody Certification, allowing us to handle and distribute certified seafood through a verified chain of custody. Our portfolio includes a variety of MSC-certified products, including Norwegian King Crab, Snow Crab, and other responsibly sourced seafood.",
    },
    {
      id: "rpm",
      name: "Responsible Plastics Management (RPM)",
      body: "Ruby Seas participates in the Responsible Plastics Management (RPM) program and has completed training focused on improving recycling practices and increasing the use of recycled content in packaging where practical.",
    },
  ],
} as const;

export const RETAIL_PARTNER_BENEFITS = {
  title: "Why Retailers Partner with Ruby Seas",
  items: [
    "Supply chain traceability",
    "FSMA 204 readiness",
    "MSC Chain of Custody Certification",
    "Responsible sourcing programs",
    "Private label packaging capabilities",
    "Reliable import and distribution throughout North America",
  ],
} as const;

/** Retail assortment grid — page 2 of the Retail section (home). */
export const RETAIL_PRODUCTS_INTRO = {
  title: "Retail Assortment",
  description:
    "Shelf-ready Ruby Seas programs built for retail velocity — premium frozen seafood with consistent spec, labeling, and supply.",
} as const;

export const RETAIL_PRODUCTS = [
  {
    id: "breaded-calamari-rings",
    title: "Breaded Calamari Rings",
    image: "/retail/products/breaded-calamari-rings.jpg",
    imageAlt: "Ruby Seas breaded calamari rings retail package",
  },
  {
    id: "breaded-calamari-fries",
    title: "Breaded Calamari Fries",
    subtitle: "Salt & Pepper",
    image: "/retail/products/breaded-calamari-fries.jpg",
    imageAlt: "Ruby Seas breaded calamari fries salt and pepper retail package",
  },
  {
    id: "cooked-squid-tubes-tentacles",
    title: "Cooked Squid",
    subtitle: "Tubes & Tentacles",
    image: "/retail/products/cooked-squid-tubes-tentacles.jpg",
    imageAlt: "Ruby Seas cooked squid tubes and tentacles retail package",
  },
  {
    id: "baby-octopus",
    title: "Baby Octopus",
    image: "/retail/products/baby-octopus.jpg",
    imageAlt: "Ruby Seas baby octopus retail package",
  },
  {
    id: "southern-king-crab",
    title: "Southern King Crab",
    image: "/retail/products/southern-king-crab.jpg",
    imageAlt: "Ruby Seas Southern King Crab retail package",
  },
  {
    id: "lobster-croquettes",
    title: "Lobster Croquettes",
    image: "/retail/products/lobster-croquettes.jpg",
    imageAlt: "Ruby Seas lobster croquettes retail package",
  },
  {
    id: "mussel-meat",
    title: "Mussel Meat",
    image: "/retail/products/mussel-meat.jpg",
    imageAlt: "Ruby Seas mussel meat retail package",
  },
  {
    id: "spanish-paella",
    title: "Spanish Paella",
    image: "/retail/products/spanish-paella.jpg",
    imageAlt: "Ruby Seas Spanish paella retail package",
  },
  {
    id: "seafood-mix-octopus",
    title: "Seafood Mix",
    subtitle: "with Octopus",
    image: "/retail/products/seafood-mix-octopus.jpg",
    imageAlt: "Ruby Seas seafood mix with octopus retail package",
  },
  {
    id: "seafood-mix-surimi",
    title: "Seafood Mix",
    subtitle: "with Surimi",
    image: "/retail/products/seafood-mix-surimi.jpg",
    imageAlt: "Ruby Seas seafood mix with surimi retail package",
  },
  {
    id: "half-shell-scallops",
    title: "Half Shell Scallops",
    image: "/retail/products/half-shell-scallops.jpg",
    imageAlt: "Ruby Seas half shell scallops retail package",
  },
  {
    id: "cooked-white-clams",
    title: "Cooked White Clams",
    image: "/retail/products/cooked-white-clams.jpg",
    imageAlt: "Ruby Seas cooked white clams retail package",
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
