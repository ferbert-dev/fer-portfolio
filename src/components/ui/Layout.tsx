import type { CSSProperties, ReactNode } from 'react';
import { Heading, Lead, MarkedText, SectionLabel, type Marked } from './Heading';

/**
 * A home-page section: content width, the section rhythm, and its link to the heading.
 * `fit` is for interactive demos: on desktop the label, heading and panel share one
 * window height, so the demo is seen whole while it runs (rules in globals.css).
 */
export function Section({ id, titleId, fit, className, style, children }: { id?: string; titleId: string; fit?: boolean; className?: string; style?: CSSProperties; children: ReactNode }) {
  const cls = ['wrap', 'sec', fit ? 'fit' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <section id={id} aria-labelledby={titleId} className={cls} style={style} data-section={id}>
      {children}
    </section>
  );
}

type SectionHeadProps = {
  label: string;
  title: Marked;
  titleId: string;
  /** Heading line length in ch. */
  width?: string;
  lead: ReactNode;
  leadWidth?: string;
  /** Space between the head row and the content below. */
  below?: number;
  titleClass?: string;
};

/** Label row, then the heading and its lead side by side (they wrap below each other on small screens). */
export function SectionHead({ label, title, titleId, width, lead, leadWidth, below, titleClass }: SectionHeadProps) {
  return (
    <>
      <SectionLabel>{label}</SectionLabel>
      <div className="head-row" style={below !== undefined ? { paddingBottom: below } : undefined}>
        <Heading id={titleId} text={title} width={width} className={titleClass} />
        <Lead width={leadWidth}>{lead}</Lead>
      </div>
    </>
  );
}

/** Outer frame of an inner page (Contact, Blog, Legal, 404). */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `wrap page ${className}` : 'wrap page'}>{children}</div>;
}

type PageHeaderProps = {
  label: ReactNode;
  title: Marked;
  size?: 'xl' | 'lg';
  width?: string;
  /** A shorter gap below the header (Blog, where filters follow). */
  tight?: boolean;
  /** Right-hand side: usually a PageLead. */
  children?: ReactNode;
};

/** Label row, then the page title (plays its entrance on load) with the lead or notes beside it. */
export function PageHeader({ label, title, size = 'xl', width, tight, children }: PageHeaderProps) {
  return (
    <>
      <SectionLabel reveal={false}>{label}</SectionLabel>
      <div className={`page-head${tight ? ' tight' : ''}`}>
        <h1 className={size} style={width ? { maxWidth: width } : undefined}><MarkedText text={title} entrance="load" /></h1>
        {children}
      </div>
    </>
  );
}

/** The 17px lead beside a page title. */
export function PageLead({ children }: { children: ReactNode }) {
  return <p className="sub page-lead">{children}</p>;
}

/**
 * The framed panel of the hero and the closing call to action: frame colour,
 * dot grid and a soft glow. `glow` is the glow's radial-gradient.
 */
export function FramePanel({ glow, className, style, children }: { glow: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`frame${className ? ` ${className}` : ''}`} style={{ ['--glow-img' as string]: glow, ...style }}>
      {children}
    </div>
  );
}
