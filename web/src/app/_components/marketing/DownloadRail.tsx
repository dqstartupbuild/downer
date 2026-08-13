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
    : "rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-4 shadow-[0_6px_18px_var(--dock-shadow)]";
  const gridClass = compact
    ? "grid grid-cols-3 gap-2"
    : "grid grid-cols-3 gap-2 sm:gap-3";
  const itemClass = compact
    ? "group relative min-h-24 rounded-[8px] border border-[var(--tag-border)] bg-[var(--panel)] p-2"
    : "group relative min-h-24 rounded-[8px] border border-[var(--tag-border)] bg-[var(--panel-raised)] p-2 sm:min-h-32 sm:p-4";
  const railClass = compact
    ? "absolute left-5 right-5 top-1/2 h-1 origin-left rounded-[8px] bg-[var(--routing-rail)]"
    : "absolute left-5 right-5 top-1/2 h-1 origin-left rounded-[8px] bg-[var(--routing-rail)] sm:left-9 sm:right-9";
  const folderClass =
    "flex items-center justify-center gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--panel)] px-1 py-2 text-xs font-semibold text-[var(--ink)] sm:justify-start sm:px-2 sm:text-sm";
  const folderIconClass =
    "relative hidden h-5 w-7 rounded-[5px] bg-[var(--accent)] before:absolute before:-top-1 before:left-1 before:h-2 before:w-3 before:rounded-t-[4px] before:bg-[var(--accent-glow)] sm:block";

  return (
    <div className={shellClass} aria-label="File types routing to folders">
      <div className="relative">
        <div className={railClass} aria-hidden="true" />
        <div className={gridClass}>
          {routes.map((route) => (
            <div className={itemClass} key={route.extension}>
              <div className="relative z-10 flex h-full flex-col justify-between gap-3">
                <span className="inline-flex w-fit rounded-[8px] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-1 font-mono text-xs font-semibold text-[var(--tag-text)] transition-transform duration-200 group-hover:translate-x-1.5">
                  {route.extension}
                </span>
                <div className={folderClass}>
                  <span className={folderIconClass} aria-hidden="true" />
                  <span>{route.folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
