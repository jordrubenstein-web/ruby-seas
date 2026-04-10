import { Variants } from "framer-motion";

/**
 * Slide-up only (no opacity: 0). Opacity on large `motion.section` / wrappers caused a
 * flash of correct SSR paint, then a “white screen” after hydrate — transparent blocks
 * showed the pearl body through full-bleed layouts.
 */
export const fadeUp: Variants = {
  hidden: { y: 16 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const;

/** Scroll reveal for content sections (About, etc.) — opacity + lift. */
export const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportSection = {
  once: true,
  amount: 0.14,
  margin: "0px 0px -48px 0px",
} as const;

/** Full-bleed video/hero bands — lift only (no opacity) to avoid flash on hydrate. */
export const sectionLift: Variants = {
  hidden: { y: 48 },
  visible: {
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Product grid cards — springy scroll reveal */
export const productCard: Variants = {
  hidden: { y: 32, scale: 0.96 },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 280,
      mass: 0.85,
    },
  },
};

/** Stat cards: slight lift + scale for scroll reveal */
export const cardReveal: Variants = {
  hidden: { y: 20, scale: 0.96 },
  visible: {
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Container that only staggers children (no own motion) */
export const staggerOnly: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

/** Headline + copy + stat grid: stagger top-level children */
export const scaleSectionOrchestration: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};
