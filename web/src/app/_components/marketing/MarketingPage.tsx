import { BehaviorComparison } from "~/app/_components/marketing/BehaviorComparison";
import { FinalCtaSection } from "~/app/_components/marketing/FinalCtaSection";
import { HeroSection } from "~/app/_components/marketing/HeroSection";
import { LandingStripSection } from "~/app/_components/marketing/LandingStripSection";
import { MacFitSection } from "~/app/_components/marketing/MacFitSection";
import { MarketingFooter } from "~/app/_components/marketing/MarketingFooter";
import { MarketingNav } from "~/app/_components/marketing/MarketingNav";
import { PrivacyProofSection } from "~/app/_components/marketing/PrivacyProofSection";
import { RulesSection } from "~/app/_components/marketing/RulesSection";
import type { ReleaseState } from "~/lib/release/ReleaseState";

type MarketingPageProps = {
  releaseState: ReleaseState;
};

export function MarketingPage({ releaseState }: MarketingPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--window)] text-[var(--ink)]">
      <MarketingNav releaseState={releaseState} />
      <main>
        <HeroSection releaseState={releaseState} />
        <LandingStripSection />
        <BehaviorComparison />
        <RulesSection />
        <PrivacyProofSection />
        <MacFitSection />
        <FinalCtaSection releaseState={releaseState} />
      </main>
      <MarketingFooter releaseState={releaseState} />
    </div>
  );
}
