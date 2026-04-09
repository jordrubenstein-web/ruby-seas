import { HeroSection } from "@/components/home/HeroSection";
import { DualPathway } from "@/components/home/DualPathway";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { StatsRibbon } from "@/components/home/StatsRibbon";
import { ProductPreview } from "@/components/home/ProductPreview";
import { TraceabilityTeaser } from "@/components/home/TraceabilityTeaser";
import { GlobalMap } from "@/components/home/GlobalMap";
import { CTABand } from "@/components/shared/CTABand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DualPathway />
      <section className="section-py bg-white">
        <SectionWrapper>
          <h2 className="text-center font-display text-3xl font-bold text-navy-900 md:text-4xl">
            Scale you can measure
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Integrity, transparency, and operational throughput — verified
            across shipments, ports, and partner programs.
          </p>
          <div className="mt-12">
            <StatsRibbon />
          </div>
        </SectionWrapper>
      </section>
      <ProductPreview />
      <TraceabilityTeaser />
      <GlobalMap />
      <CTABand />
    </>
  );
}
