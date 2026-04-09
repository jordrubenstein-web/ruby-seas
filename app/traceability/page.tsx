import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/traceability/JourneyTimeline";
import { QRCodeDemo } from "@/components/traceability/QRCodeDemo";
import { CTABand } from "@/components/shared/CTABand";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Traceability",
  description:
    "MSC chain-of-custody, QR-enabled retail packaging, and cold-chain verification.",
};

export default function TraceabilityPage() {
  return (
    <>
      <div className="border-b border-navy-800 bg-navy-900 pt-28 pb-16">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-400">
            Tech-forward supply chain
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
            Traceability that holds up to scrutiny
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            From diver harvest to retail scan — auditable steps, not marketing
            claims.
          </p>
        </div>
      </div>

      <section className="section-py bg-navy-900">
        <SectionWrapper>
          <JourneyTimeline />
        </SectionWrapper>
      </section>

      <section className="section-py bg-navy-800/50">
        <SectionWrapper>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Bahamas processing facility
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Caribbean spiny lobster (Panulirus argus) from a small day-boat
                fishery near Abaco — diver-caught to eliminate bycatch, then
                single-frozen at our facility without sodium metabisulfite or
                sodium tripolyphosphate. The fishery carries Marine Stewardship
                Council certification.
              </p>
            </div>
            <QRCodeDemo />
          </div>
        </SectionWrapper>
      </section>

      <CTABand />
    </>
  );
}
