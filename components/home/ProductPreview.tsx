"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function ProductPreview() {
  return (
    <section className="section-py bg-pearl">
      <motion.div
        className="mx-auto max-w-content px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Premium Categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Benefit-driven sourcing — MSC where it matters, EU/FDA compliance
            everywhere.
          </p>
        </motion.div>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
          {PRODUCT_CATEGORIES.map((cat) => (
            <motion.article
              key={cat.id}
              variants={fadeUp}
              className="w-[85vw] shrink-0 snap-center sm:w-auto"
            >
              <Link
                href="/products"
                className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 85vw, 25vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold text-accent">
                    {cat.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-seafoam-600">
                    {cat.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-seafoam-600">
                    View category →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex rounded-full border-2 border-navy-800 px-8 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
          >
            All Products
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
