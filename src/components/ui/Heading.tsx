import type { ReactNode } from 'react';

export type Marked = { before: string; mark: string; after: string };

/**
 * A heading text with one lime-marked phrase. The marked phrase and the
 * punctuation right after it stay on one line.
 */
export function MarkedText({ text }: { text: Marked }) {
  const m = /^[.,;:!?]+/.exec(text.after);
  const punct = m ? m[0] : '';
  const rest = text.after.slice(punct.length);
  return (
    <>
      {text.before}
      <span className="nw"><span className="mk">{text.mark}</span>{punct}</span>
      {rest}
    </>
  );
}

/** Mono label row with the small lime square and a hairline below. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mono lab" data-rv="">{children}</div>;
}
