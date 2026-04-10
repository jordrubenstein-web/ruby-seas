/** @type {import('next').NextConfig} */
// Skip Next image optimizer unless NEXT_IMAGE_OPTIMIZE=1. Remote optimization
// uses Node TLS and often fails (corporate CA, preview envs); the browser loads
// src URLs directly when unoptimized.
const disableImageOptimizer = process.env.NEXT_IMAGE_OPTIMIZE !== "1";

const nextConfig = {
  /** Hides the corner dev-tools badge in `next dev` (portal may still exist for errors). */
  devIndicators: false,
  // Only transpile packages that need it for Next's bundler. Transpiling
  // three/R3F/drei can duplicate internals and trigger dev runtime
  // `undefined (reading 'call')` in webpack chunk graphs.
  transpilePackages: ["leaflet", "react-leaflet"],
  images: {
    // Skip optimizer in dev (or when NEXT_IMAGE_UNOPTIMIZED=1) so remote images
    // load in the browser. Avoids Node fetch TLS errors (e.g. corporate CA /
    // UNABLE_TO_GET_ISSUER_CERT_LOCALLY) on /_next/image.
    ...(disableImageOptimizer ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a.basemaps.cartocdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "b.basemaps.cartocdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.basemaps.cartocdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d.basemaps.cartocdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
