import { KeywordRoutingExample } from "~/app/_components/marketing/KeywordRoutingExample";

export function RulesSection() {
  return (
    <section
      id="keyword-rules"
      aria-labelledby="rules-title"
      className="bg-[var(--window)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <h2
            id="rules-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Invoices go to Finance.
          </h2>
          <p className="mt-5 max-w-[520px] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Match words like invoice, receipt, or 1099 in the filename. Capitals
            and the file extension do not affect a match. SortDock checks rules
            from top to bottom, then falls back to the file type.
          </p>
        </div>

        <div>
          <KeywordRoutingExample />
        </div>
      </div>
    </section>
  );
}
