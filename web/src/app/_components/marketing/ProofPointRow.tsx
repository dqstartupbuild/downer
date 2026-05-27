type ProofPointRowProps = {
  text: string;
  detail?: string;
};

export function ProofPointRow({ text, detail }: ProofPointRowProps) {
  return (
    <div className="flex gap-3 border-t border-[var(--line)] py-4 first:border-t-0">
      <span
        className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[var(--tag-border)] bg-[var(--tag-bg)]"
        aria-hidden="true"
      >
        <span className="size-2 rounded-[3px] bg-[var(--accent)]" />
      </span>
      <div>
        <p className="text-base leading-6 font-semibold text-[var(--ink)]">
          {text}
        </p>
        {detail ? (
          <p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}
