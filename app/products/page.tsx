import type { Metadata } from "next";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { ProductCategoryCard } from "@/components/products/ProductCategoryCard";
import { CTABand } from "@/components/shared/CTABand";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Core lobster and crab programs — North American lobster, Bahamas Ruby Seas brand, snow crab, king crab, and more.",
};

export default function ProductsPage() {
  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-navy-900 to-navy-800 pt-28 pb-16 text-center">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Core products
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Lobster &amp; crab, built for scale
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            From North American lobster and Bahamas Ruby Seas brand to Norwegian
            snow crab and Pacific Dungeness — programs aligned to foodservice
            and retail demand.
          </p>
        </div>
      </div>

      <section className="section-py bg-pearl">
        <div className="mx-auto max-w-content space-y-24 px-4 sm:px-6 lg:px-8">
          {PRODUCT_CATEGORIES.map((cat, index) => (
            <ProductCategoryCard
              key={cat.id}
              title={cat.title}
              description={cat.description}
              badge={cat.badge}
              image={cat.image}
              imageAlt={cat.imageAlt}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
