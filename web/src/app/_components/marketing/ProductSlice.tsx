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
    <article className="flex flex-col">
      <div className="order-2 mt-5 rounded-[8px] border border-[var(--line)] bg-[var(--panel-raised)] p-4 lg:order-1 lg:mt-0 lg:min-h-44">
        {children}
      </div>
      <div className="order-1 lg:order-2 lg:mt-5">
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
