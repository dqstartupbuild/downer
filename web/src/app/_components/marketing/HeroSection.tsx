import Link from "next/link";

import { HeroProductImage } from "~/app/_components/marketing/HeroProductImage";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative h-[88svh] max-h-[760px] min-h-[560px] overflow-hidden"
    >
      <HeroProductImage />

      <div className="relative z-10 mx-auto flex h-full max-w-[1180px] items-start px-5 pt-28 md:items-center md:px-10 md:pt-16 lg:px-[72px]">
        <div className="max-w-[500px] motion-safe:animate-[rise-in_520ms_ease-out_420ms_both]">
          <h1
            id="hero-title"
            className="font-serif text-5xl leading-[0.95] font-bold text-[var(--ink)] sm:text-6xl lg:text-7xl"
          >
            SortDock
          </h1>
          <p className="mt-5 max-w-[440px] text-2xl leading-tight font-semibold text-[var(--ink)] sm:text-3xl">
            Keep Downloads clean without babysitting every file.
          </p>
          <p className="mt-5 max-w-[460px] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Choose a folder, set a few rules, and let new downloads land where
            they belong. Ask first or move automatically.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
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
              See how it sorts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
