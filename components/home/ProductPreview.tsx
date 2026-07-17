"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { fadeUp, productCard, viewportOnce } from "@/lib/animations";

export function ProductPreview() {
  return (
    <section className="bg-pearl pt-[var(--section-py)] pb-8 lg:pb-10">
      <motion.div
        className="mx-auto max-w-content px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ ...viewportOnce, amount: 0.12 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.06,
            },
          },
        }}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2
            id="core-products-focus"
            className="font-display scroll-mt-28 text-3xl font-bold text-navy-900 md:text-4xl"
          >
            Core Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Lobster, crab, finfish, shrimp, and shellfish programs built for
            consistent quality — from North American lobster to Norwegian snow
            crab, Pacific species, and global whitefish and value-added lines.
          </p>
        </motion.div>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:items-stretch sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.article
              key={cat.id}
              variants={productCard}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 28 },
              }}
              className="flex h-full w-[85vw] shrink-0 snap-center sm:w-auto"
            >
              <Link
                href={`/products#${cat.id}`}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, 25vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-slate-100"
                      aria-hidden
                    />
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold text-accent">
                    {cat.badge}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-3 min-h-[3.75rem] font-display text-lg font-bold leading-snug text-navy-900 group-hover:text-seafoam-600 md:min-h-[4.25rem]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {cat.description}
                  </p>
                  <span className="mt-auto inline-block pt-4 text-sm font-semibold text-seafoam-600">
                    View category →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
