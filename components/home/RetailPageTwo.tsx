"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RETAIL_PRODUCTS, RETAIL_PRODUCTS_INTRO } from "@/lib/constants";
import { fadeUp, productCard, viewportOnce } from "@/lib/animations";

export function RetailPageTwo() {
  return (
    <section
      id="retail-focus-2"
      aria-label="Retail assortment"
      className="scroll-mt-28 bg-white pt-12 pb-[var(--section-py)] lg:pt-16"
    >
      <motion.div
        className="mx-auto max-w-content px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ ...viewportOnce, amount: 0.12 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.05,
            },
          },
        }}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
            {RETAIL_PRODUCTS_INTRO.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            {RETAIL_PRODUCTS_INTRO.description}
          </p>
        </motion.div>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:items-stretch sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {RETAIL_PRODUCTS.map((item) => (
            <motion.article
              key={item.id}
              variants={productCard}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 28 },
              }}
              className="flex h-full w-[72vw] shrink-0 snap-center sm:w-auto"
            >
              <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-xl">
                <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gradient-to-b from-pearl to-white">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 72vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-slate-100 p-4 text-center sm:p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-navy-900 sm:text-lg">
                    {item.title}
                  </h3>
                  {"subtitle" in item && item.subtitle ? (
                    <p className="mt-1 text-sm italic text-slate-600">
                      {item.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
