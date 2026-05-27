import { DownloadRail } from "~/app/_components/marketing/DownloadRail";
import { ProofPointRow } from "~/app/_components/marketing/ProofPointRow";

const proofPoints = [
  "PDFs go to PDFs. Screenshots go to Images. Installers go to Apps.",
  "Unknown files can stay put or go to a default folder.",
  "SortDock waits before moving so unfinished downloads are not touched.",
];

export function LandingStripSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="landing-strip-title"
      className="bg-[var(--window)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.12fr_0.88fr] md:items-center">
        <div className="relative">
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-[var(--ink-muted)]">
            <span
              className="h-px w-12 bg-[var(--routing-rail)]"
              aria-hidden="true"
            />
            The Download Landing Strip
          </div>
          <DownloadRail />
        </div>

        <div>
          <h2
            id="landing-strip-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            New files get a place to land.
          </h2>
          <div className="mt-6">
            {proofPoints.map((proofPoint) => (
              <ProofPointRow key={proofPoint} text={proofPoint} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
