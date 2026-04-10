import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foodservice",
  description: "Foodservice distributors — Ruby Seas International.",
};

export default function FoodservicePage() {
  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-navy-900 to-navy-800 pt-28 pb-16 text-center">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Foodservice
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Distributors
          </h1>
        </div>
      </div>

      <section className="section-py bg-pearl">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8" />
      </section>
    </>
  );
}
