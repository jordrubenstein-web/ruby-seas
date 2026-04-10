"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const foodserviceImg = "/home/dual-wholesale.jpg";
const retailImg = "/home/dual-retail.jpg";

export function WhoWeServe() {
  return (
    <motion.section
      id="who-we-serve"
      className="relative scroll-mt-28 bg-navy-900"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-center text-2xl font-bold text-white md:text-3xl">
          Who We Serve
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
          Two pathways —{" "}
          <span className="text-slate-300">foodservice distributors</span> and{" "}
          <span className="text-slate-300">retail stores &amp; grocery chains</span>{" "}
          — with the same quality and compliance standards we apply worldwide.
        </p>

        <div className="mt-12 flex flex-col gap-4 lg:h-[420px] lg:flex-row lg:gap-0">
          <Link
            href="/get-a-quote"
            className="group relative flex min-h-[280px] flex-1 overflow-hidden rounded-2xl lg:min-h-0 lg:rounded-r-none lg:rounded-l-2xl lg:transition-[flex] lg:duration-500 lg:ease-out lg:hover:flex-[1.1]"
          >
            <Image
              src={foodserviceImg}
              alt="Foodservice distribution — logistics and cold chain"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <h3 className="font-display text-2xl font-bold text-white md:text-[1.65rem]">
                Foodservice distributors
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-300">
                Volume programs, spec-built packs, and cold-chain logistics for
                operators and broadline distribution.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-seafoam-400">
                Request a quote →
              </span>
            </div>
          </Link>

          <Link
            href="/products"
            className="group relative flex min-h-[280px] flex-1 overflow-hidden rounded-2xl lg:min-h-0 lg:rounded-l-none lg:rounded-r-2xl lg:transition-[flex] lg:duration-500 lg:ease-out lg:hover:flex-[1.1]"
          >
            <Image
              src={retailImg}
              alt="Retail grocery seafood display"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <h3 className="font-display text-2xl font-bold text-white md:text-[1.65rem]">
                Retail stores &amp; grocery chains
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-300">
                Shelf-ready SKUs, brand programs, and category support for
                national and regional retail.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-seafoam-400">
                Explore core products →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
