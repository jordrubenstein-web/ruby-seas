import { HomeHashScroller } from "@/components/home/HomeHashScroller";
import { HeroSection } from "@/components/home/HeroSection";
import { SplashSection } from "@/components/home/SplashSection";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { ScaleStatsSection } from "@/components/home/ScaleStatsSection";
import { ProductPreview } from "@/components/home/ProductPreview";
import { WhyRubySeas } from "@/components/home/WhyRubySeas";
import { GlobalMap } from "@/components/home/GlobalMap";
import { CTABand } from "@/components/shared/CTABand";

export default function HomePage() {
  return (
    <>
      <HomeHashScroller />
      <SplashSection />
      <HeroSection />
      <WhoWeServe />
      <ScaleStatsSection />
      <ProductPreview />
      <WhyRubySeas />
      <GlobalMap />
      <CTABand />
    </>
  );
}
