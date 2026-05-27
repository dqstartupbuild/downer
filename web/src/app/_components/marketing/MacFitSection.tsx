import { ProductSlice } from "~/app/_components/marketing/ProductSlice";

export function MacFitSection() {
  return (
    <section
      aria-labelledby="mac-fit-title"
      className="bg-[var(--window)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 md:grid-cols-[0.76fr_1.24fr] md:items-end">
          <div>
            <p className="text-sm font-semibold text-[var(--tag-text)]">
              Fits how Macs work
            </p>
            <h2
              id="mac-fit-title"
              className="mt-3 font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
            >
              Open the window when you need it.
            </h2>
          </div>
          <p className="max-w-[620px] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Open the window when you want to adjust rules. Use the menu bar when
            you only need to pause or resume sorting.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ProductSlice
            title="Menu bar"
            body="Pause or resume sorting without opening the full window."
          >
            <div className="ml-auto max-w-xs rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-3 shadow-[0_14px_36px_var(--dock-shadow)]">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-sm font-semibold text-[var(--ink)]">
                <span>SortDock</span>
                <span
                  className="size-2 rounded-full bg-[var(--active)]"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-2 pt-3 text-sm text-[var(--ink-muted)]">
                <p>Sorting active</p>
                <p>Open SortDock</p>
                <p>Pause sorting</p>
              </div>
            </div>
          </ProductSlice>

          <ProductSlice
            title="Main window"
            body="Choose the watched folder, add destinations, and keep rules short."
          >
            <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[8px] border border-[var(--line)] bg-[var(--panel)] p-3">
                <p className="text-xs font-semibold text-[var(--ink-muted)]">
                  Watch Folder
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  Downloads
                </p>
              </div>
              <div className="space-y-2">
                {[".pdf to PDFs", ".png to Images", ".dmg to Apps"].map(
                  (rule) => (
                    <div
                      key={rule}
                      className="rounded-[8px] border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-semibold text-[var(--ink)]"
                    >
                      {rule}
                    </div>
                  ),
                )}
              </div>
            </div>
          </ProductSlice>

          <ProductSlice
            title="Prompt"
            body="Ask Later is there when a file needs one more look."
          >
            <div className="mx-auto max-w-xs rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] p-4 shadow-[0_14px_36px_var(--dock-shadow)]">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Move 5 new items to their folders?
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
                <span className="rounded-[8px] bg-[var(--accent)] px-3 py-2 text-center text-[var(--ink-on-accent)]">
                  Move All
                </span>
                <span className="rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] px-3 py-2 text-center text-[var(--ink)]">
                  Review
                </span>
                <span className="rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] px-3 py-2 text-center text-[var(--ink)]">
                  Leave All
                </span>
                <span className="rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] px-3 py-2 text-center text-[var(--ink)]">
                  Ask Later
                </span>
              </div>
            </div>
          </ProductSlice>
        </div>
      </div>
    </section>
  );
}
