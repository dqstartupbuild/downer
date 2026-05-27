import { DownloadRail } from "~/app/_components/marketing/DownloadRail";

export function RulesSection() {
  return (
    <section
      aria-labelledby="rules-title"
      className="bg-[var(--window)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-center">
        <div>
          <h2
            id="rules-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Rules you can read at a glance.
          </h2>
          <p className="mt-5 max-w-[520px] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            No AppleScript. No folder-action setup. No hidden automation files.
            Just file types and folders.
          </p>
        </div>

        <div>
          <DownloadRail />
        </div>
      </div>
    </section>
  );
}
