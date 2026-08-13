import { ProductSlice } from "~/app/_components/marketing/ProductSlice";

export function BehaviorComparison() {
  return (
    <section
      aria-labelledby="behavior-title"
      className="bg-[image:var(--section-tint)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[640px]">
          <h2
            id="behavior-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Ask first, or let it move quietly.
          </h2>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-5">
          <ProductSlice
            eyebrow="Ask First"
            title="Ask before moving"
            body="SortDock checks with you when a new file arrives. Move it, choose another folder, leave it, or ask later."
          >
            <div className="mx-auto max-w-sm rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-4 shadow-[0_4px_12px_var(--dock-shadow)]">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Move &quot;invoice.pdf&quot; to &quot;PDFs&quot;?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Move", "Choose Folder", "Leave", "Ask Later"].map(
                  (action) => (
                    <span
                      key={action}
                      className="rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] px-3 py-2 text-xs font-semibold text-[var(--ink)]"
                    >
                      {action}
                    </span>
                  ),
                )}
              </div>
            </div>
          </ProductSlice>

          <ProductSlice
            eyebrow="Auto Move"
            title="Move automatically"
            body="Once your rules feel right, SortDock can clean up quietly in the background."
          >
            <div className="space-y-3">
              {[
                { fileName: "report.pdf", folder: "PDFs" },
                { fileName: "screenshot.png", folder: "Images" },
                { fileName: "installer.dmg", folder: "Apps" },
              ].map((fileMove) => (
                <div
                  key={fileMove.fileName}
                  className="flex items-center justify-between gap-3 rounded-[8px] border border-[var(--line)] bg-[var(--panel)] px-3 py-2"
                >
                  <span className="truncate text-sm font-semibold text-[var(--ink)]">
                    {fileMove.fileName}
                  </span>
                  <span className="shrink-0 rounded-[8px] bg-[var(--tag-bg)] px-2 py-1 text-xs font-semibold text-[var(--tag-text)]">
                    {fileMove.folder}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-muted)]">
                <span
                  className="size-2 rounded-full bg-[var(--active)]"
                  aria-hidden="true"
                />
                Moved after 10 seconds
              </div>
            </div>
          </ProductSlice>
        </div>
      </div>
    </section>
  );
}
