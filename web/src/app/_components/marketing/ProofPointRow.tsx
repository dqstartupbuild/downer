type ProofPointRowProps = {
  text: string;
  detail?: string;
};

export function ProofPointRow({ text, detail }: ProofPointRowProps) {
  return (
    <div className="flex gap-3 border-t border-[var(--line)] py-4 first:border-t-0">
      <span
        className="mt-1.5 size-3 shrink-0 bg-[var(--accent)] [clip-path:polygon(0_0,100%_0,100%_68%,68%_68%,68%_100%,0_100%)]"
        aria-hidden="true"
      />
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
