import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="bg-[image:var(--section-tint)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 border-y border-[var(--line)] py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-[720px]">
          <h2
            id="download-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Clean up Downloads once. Keep it clean after that.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Set the folders you care about, choose how SortDock should move new
            files, and leave the rest alone.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link
            href="#download"
            className="inline-flex min-h-11 items-center rounded-[8px] bg-[image:linear-gradient(135deg,var(--button-primary-start),var(--button-primary-end))] px-5 text-sm font-semibold text-[var(--ink-on-accent)] shadow-[0_16px_34px_var(--dock-shadow)] transition-transform outline-none hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            Download for Mac
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex min-h-11 items-center rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] px-5 text-sm font-semibold text-[var(--ink)] shadow-[0_12px_24px_var(--dock-shadow)] transition-transform outline-none hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            Read the setup guide
          </Link>
        </div>
      </div>
    </section>
  );
}
