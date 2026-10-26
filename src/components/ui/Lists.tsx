import type { CSSProperties, ReactNode } from 'react';

type GridProps = {
  as?: 'ul' | 'ol' | 'div';
  /** Narrowest a column may get, in px. Columns are added while they fit; phones get one. */
  min: number;
  /** Space between cards: a number in px or a CSS gap value like '20px 24px'. */
  gap?: number | string;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  children: ReactNode;
};

/** Responsive grid of cards (trust cards, pricing offers, steps). Lists lose their bullets. */
export function CardGrid({ as: Tag = 'ul', min, gap = 8, className, style, children, ...rest }: GridProps) {
  const vars = { ['--min' as string]: `${min}px`, ['--gap' as string]: typeof gap === 'number' ? `${gap}px` : gap };
  return (
    <Tag className={`grid-fit${className ? ` ${className}` : ''}`} style={{ ...vars, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

const Check = () => (
  <span className="chk-mark" aria-hidden="true">
    <svg width="9" height="9" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 4.8l2 2L7.5 2.4" /></svg>
  </span>
);

/** List of included items, each with a round check mark (pricing offers). */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list check-list">
      {items.map((it) => (
        <li key={it}>
          <Check />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
