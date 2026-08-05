import type { Metadata } from "next";
import { RETAIL_PRODUCTS, RETAIL_PRODUCTS_INTRO } from "@/lib/constants";
import { RetailProductCard } from "@/components/retail/RetailProductCard";
import { RetailHashScroller } from "@/components/retail/RetailHashScroller";
import { CTABand } from "@/components/shared/CTABand";

export const metadata: Metadata = {
  title: "Retail Assortment",
  description: RETAIL_PRODUCTS_INTRO.description,
};

export default function RetailPage() {
  return (
    <>
      <RetailHashScroller />
      <div className="border-b border-slate-100 bg-gradient-to-b from-navy-900 to-navy-800 pt-28 pb-16 text-center">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Retail
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            {RETAIL_PRODUCTS_INTRO.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {RETAIL_PRODUCTS_INTRO.description}
          </p>
        </div>
      </div>

      <section className="section-py bg-pearl">
        <div className="mx-auto max-w-content space-y-24 px-4 sm:px-6 lg:px-8">
          {RETAIL_PRODUCTS.map((item, index) => (
            <RetailProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={"subtitle" in item ? item.subtitle : undefined}
              image={item.image}
              imageAlt={item.imageAlt}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
