const keywordRules = [
  {
    order: "1",
    keywords: "invoice, receipt",
    destination: "Finance",
    isMatch: true,
  },
  {
    order: "2",
    keywords: "tax, 1099",
    destination: "Taxes",
    isMatch: false,
  },
];

export function KeywordRoutingExample() {
  return (
    <div
      role="group"
      aria-label="Client Invoice PDF matches the first keyword rule and moves to Finance before the PDF rule is checked."
      className="rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-4 shadow-[0_6px_18px_var(--dock-shadow)] sm:p-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[var(--ink-muted)]">
            New download
          </p>
          <p className="mt-1 text-base font-semibold text-[var(--ink)] sm:text-lg">
            Client Invoice.pdf
          </p>
        </div>
        <p className="text-xs font-semibold text-[var(--tag-text)]">
          Checked from top to bottom
        </p>
      </div>

      <ol className="mt-5 space-y-2">
        {keywordRules.map((rule) => (
          <li
            key={rule.order}
            className={`grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] px-3 py-3 ${
              rule.isMatch
                ? "bg-[var(--accent-soft)]"
                : "bg-[var(--panel-raised)]"
            }`}
          >
            <span className="text-sm font-semibold text-[var(--ink-muted)]">
              {rule.order}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--ink)]">
                {rule.keywords}
              </p>
              <p className="mt-0.5 text-xs text-[var(--ink-muted)]">
                Words in the filename
              </p>
            </div>
            <span className="text-sm font-semibold text-[var(--ink)]">
              {rule.destination}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-3 grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 text-sm text-[var(--ink-muted)]">
        <span aria-hidden="true">·</span>
        <span>.pdf fallback</span>
        <span className="font-semibold">PDFs</span>
      </div>
    </div>
  );
}
