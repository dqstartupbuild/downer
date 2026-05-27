type DownloadRailProps = {
  compact?: boolean;
};

const routes = [
  { extension: ".pdf", folder: "PDFs" },
  { extension: ".png", folder: "Images" },
  { extension: ".dmg", folder: "Apps" },
];

export function DownloadRail({ compact = false }: DownloadRailProps) {
  const shellClass = compact
    ? "rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] p-3"
    : "rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-4 shadow-[0_18px_48px_var(--dock-shadow)]";
  const gridClass = compact
    ? "grid grid-cols-3 gap-2"
    : "grid grid-cols-1 gap-3 sm:grid-cols-3";
  const itemClass = compact
    ? "group relative min-h-24 rounded-[8px] border border-[var(--tag-border)] bg-[var(--panel)] p-2"
    : "group relative min-h-32 rounded-[8px] border border-[var(--tag-border)] bg-[var(--panel-raised)] p-4";
  const railClass = compact
    ? "absolute left-5 right-5 top-1/2 h-1 origin-left rounded-[8px] bg-[var(--routing-rail)]"
    : "absolute left-9 right-9 top-1/2 h-1 origin-left rounded-[8px] bg-[var(--routing-rail)]";

  return (
    <div className={shellClass} aria-label="File types routing to folders">
      <div className="relative">
        <div
          className={`${railClass} motion-safe:animate-[rail-draw_620ms_ease-out_300ms_both]`}
          aria-hidden="true"
        />
        <div className={gridClass}>
          {routes.map((route) => (
            <div className={itemClass} key={route.extension}>
              <div className="relative z-10 flex h-full flex-col justify-between gap-3">
                <span className="inline-flex w-fit rounded-[8px] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-1 font-mono text-xs font-semibold text-[var(--tag-text)] transition-transform duration-200 group-hover:translate-x-1.5">
                  {route.extension}
                </span>
                <div className="flex items-center gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--panel)] px-2 py-2 text-sm font-semibold text-[var(--ink)]">
                  <span
                    className="relative block h-5 w-7 rounded-[5px] bg-[var(--accent)] before:absolute before:-top-1 before:left-1 before:h-2 before:w-3 before:rounded-t-[4px] before:bg-[var(--accent-glow)]"
                    aria-hidden="true"
                  />
                  <span className="truncate">{route.folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
