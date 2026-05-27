export function MarketingFooter() {
  return (
    <footer className="bg-[var(--window)] px-5 py-8 md:px-10 lg:px-[72px]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-[var(--ink)]">SortDock</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span>Preview build</span>
          <span>Sorting stays local.</span>
          <span>Made for macOS.</span>
        </div>
      </div>
    </footer>
  );
}
