import type { Metadata } from "next";
import { NarrativeSection } from "@/components/about/NarrativeSection";
import { ComplianceBadges } from "@/components/about/ComplianceBadges";
import { CTABand } from "@/components/shared/CTABand";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Global impact story — Canadian roots, US distribution, international reach.",
};

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-slate-100 bg-pearl pt-28 pb-16">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-seafoam-600">
            Global impact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-navy-900 md:text-5xl">
            Integrity at scale
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Ruby Seas operates where procurement, compliance, and cold-chain
            execution intersect — for retailers, wholesalers, and international
            buyers who cannot afford ambiguity.
          </p>
        </div>
      </div>

      <section className="section-py bg-white">
        <SectionWrapper>
          <NarrativeSection />
        </SectionWrapper>
      </section>

      <section className="section-py bg-pearl">
        <SectionWrapper>
          <h2 className="text-center font-display text-3xl font-bold text-navy-900">
            By the numbers
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
                  {s.value.toLocaleString()}
                  {s.suffix}
                </p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <section className="section-py bg-white">
        <SectionWrapper>
          <h2 className="text-center font-display text-3xl font-bold text-navy-900">
            Compliance & certifications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Documentation and chain-of-custody aligned with how regulators and
            retailers actually audit programs.
          </p>
          <div className="mt-12">
            <ComplianceBadges />
          </div>
        </SectionWrapper>
      </section>

      <CTABand />
    </>
  );
}
