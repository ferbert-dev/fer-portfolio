import type { ReactNode } from 'react';

export type Marked = { before: string; mark: string; after: string };

const words = (text: string) => text.split(/\s+/).filter(Boolean);

/**
 * A heading text with one lime-marked phrase. The marked phrase and the
 * punctuation right after it stay on one line.
 *
 * Each word sits in its own mask so it can rise into place: on scroll when the
 * heading carries data-rv (Motion adds and removes .pre), or on page load with
 * entrance="load" (pure CSS, no script needed). The marker sweeps in after the
 * last word. Without motion the words simply sit in place.
 */
export function MarkedText({ text, entrance = 'scroll' }: { text: Marked; entrance?: 'scroll' | 'load' }) {
  const m = /^[.,;:!?]+/.exec(text.after);
  const punct = m ? m[0] : '';
  const head = words(text.before);
  const tail = words(text.after.slice(punct.length));
  let i = 0;
  const word = (content: ReactNode, key: string) => (
    <span key={key}>
      <span className="w"><span style={{ ['--i' as string]: i++ }}>{content}</span></span>{' '}
    </span>
  );
  return (
    <span className={`wd${entrance === 'load' ? ' load' : ''}`} style={{ ['--words' as string]: head.length + 1 + tail.length }}>
      {head.map((w, k) => word(w, `h${k}`))}
      {word(<span className="nw"><span className="mk">{text.mark}</span>{punct}</span>, 'mark')}
      {tail.map((w, k) => word(w, `t${k}`))}
    </span>
  );
}

/** Mono label row with the small lime square and a hairline below. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mono lab" data-rv="">{children}</div>;
}
