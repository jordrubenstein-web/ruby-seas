import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { CTABand } from "@/components/shared/CTABand";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request pricing for retail, wholesale, or international programs.",
};

export default function GetAQuotePage() {
  return (
    <>
      <div className="border-b border-slate-100 bg-gradient-to-b from-pearl to-white pt-28 pb-12">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-navy-900 md:text-5xl">
            Get a quote
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Tell us how you buy — we&apos;ll align product, volume, and logistics
            within one business day.
          </p>
        </div>
      </div>

      <section className="section-py bg-pearl">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>

      <CTABand />
    </>
  );
}
