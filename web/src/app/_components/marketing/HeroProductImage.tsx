import Image from "next/image";

import { DownloadRail } from "~/app/_components/marketing/DownloadRail";

export function HeroProductImage() {
  return (
    <div
      role="img"
      aria-label="SortDock sorting new downloads into PDFs, Images, and Apps folders."
      className="absolute inset-0 overflow-hidden bg-[image:var(--hero-backdrop)]"
    >
      <div className="absolute inset-0 bg-[image:var(--hero-scrim)]" />

      <div className="absolute inset-x-0 bottom-6 z-0 mx-auto max-w-[1180px] px-5 md:bottom-10 md:px-10 lg:bottom-[-34px] lg:px-[72px]">
        <div className="relative ml-auto h-[470px] w-full max-w-[860px]">
          <div className="absolute right-2 bottom-0 left-2 h-28 rounded-[8px] border border-[var(--line)] bg-[var(--dock)] shadow-[0_8px_22px_var(--dock-shadow)]" />

          <div className="absolute bottom-8 left-6 z-20 hidden size-28 lg:block">
            <Image
              src="/brand/icon-glass.png"
              alt="SortDock app icon"
              width={112}
              height={112}
              className="size-full rounded-[8px] object-cover"
              priority
            />
          </div>

          <div
            className="absolute right-0 bottom-8 w-full max-w-[760px] overflow-hidden rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] shadow-[0_10px_28px_var(--dock-shadow)] min-[1360px]:right-[-150px] lg:right-[-70px] lg:bottom-16"
            data-testid="hero-product-window"
          >
            <div className="flex h-10 items-center justify-between border-b border-[var(--line)] bg-[var(--panel-raised)] px-4">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-[var(--danger)]" />
                <span className="size-3 rounded-full bg-[var(--warning)]" />
                <span className="size-3 rounded-full bg-[var(--active)]" />
              </div>
              <span className="text-sm font-semibold text-[var(--ink-muted)]">
                SortDock
              </span>
              <span className="w-12" aria-hidden="true" />
            </div>

            <div className="lg:grid lg:grid-cols-[0.38fr_0.62fr]">
              <div className="hidden border-r border-[var(--line)] bg-[var(--panel-raised)] p-4 lg:block">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                  <span
                    className="size-2 rounded-full bg-[var(--active)]"
                    aria-hidden="true"
                  />
                  Sorting active
                </div>
                <div className="mt-5 rounded-[8px] border border-[var(--line)] bg-[var(--panel)] p-3">
                  <p className="text-xs font-semibold text-[var(--ink-muted)]">
                    Watching
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    Downloads
                  </p>
                </div>
                <div className="mt-3 rounded-[8px] border border-[var(--line)] bg-[var(--panel)] p-3">
                  <p className="text-xs font-semibold text-[var(--ink-muted)]">
                    Behavior
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                    Ask before moving
                  </p>
                </div>
              </div>

              <div className="bg-[var(--panel)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--ink-muted)]">
                      New files
                    </p>
                    <p className="mt-1 text-base font-semibold text-[var(--ink)]">
                      Downloads landing strip
                    </p>
                  </div>
                  <span className="rounded-[8px] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-3 py-1 text-xs font-semibold text-[var(--tag-text)]">
                    10 sec delay
                  </span>
                </div>

                <div className="mt-5">
                  <DownloadRail compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
