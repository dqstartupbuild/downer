import type { ReactNode } from "react";

type ProductSliceProps = {
  title: string;
  body: string;
  eyebrow?: string;
  children: ReactNode;
};

export function ProductSlice({
  title,
  body,
  eyebrow,
  children,
}: ProductSliceProps) {
  return (
    <article>
      <div className="min-h-44 rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] p-4 shadow-[0_18px_44px_var(--dock-shadow)]">
        {children}
      </div>
      <div className="mt-5">
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold text-[var(--tag-text)]">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="text-xl leading-7 font-semibold text-[var(--ink)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{body}</p>
      </div>
    </article>
  );
}
