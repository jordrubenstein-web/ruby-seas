"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";

const retailImg =
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80";
const wholesaleImg =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80";

export function DualPathway() {
  return (
    <motion.section
      className="relative bg-navy-900"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-center text-2xl font-bold text-white md:text-3xl">
          How do you work with us?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-400">
          Choose your pathway — retail programs or wholesale & import.
        </p>

        <div className="mt-12 flex flex-col gap-4 lg:h-[420px] lg:flex-row lg:gap-0">
          <Link
            href="/products"
            className="group relative flex min-h-[280px] flex-1 overflow-hidden rounded-2xl lg:min-h-0 lg:rounded-r-none lg:rounded-l-2xl lg:transition-[flex] lg:duration-500 lg:ease-out lg:hover:flex-[1.1]"
          >
            <Image
              src={retailImg}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-seafoam-400">
                Retail
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                I&apos;m a Retailer
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-300">
                Ruby Seas & Rubymar brands and shelf-ready SKUs built for
                retail velocity.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-seafoam-400">
                View retail assortment →
              </span>
            </div>
          </Link>

          <Link
            href="/get-a-quote"
            className="group relative flex min-h-[280px] flex-1 overflow-hidden rounded-2xl lg:min-h-0 lg:rounded-l-none lg:rounded-r-2xl lg:transition-[flex] lg:duration-500 lg:ease-out lg:hover:flex-[1.1]"
          >
            <Image
              src={wholesaleImg}
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-seafoam-400">
                Wholesale
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                I&apos;m a Wholesaler / Importer
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-300">
                Commodity programs, cold-chain logistics, and volume pricing.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-seafoam-400">
                Request a quote →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
