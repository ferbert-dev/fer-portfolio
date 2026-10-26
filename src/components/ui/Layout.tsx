import type { CSSProperties, ReactNode } from 'react';
import { Heading, Lead, MarkedText, SectionLabel, type Marked } from './Heading';

/** A home-page section: content width, the section rhythm, and its link to the heading. */
export function Section({ id, titleId, className, style, children }: { id?: string; titleId: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={titleId} className={`wrap sec${className ? ` ${className}` : ''}`} style={style}>
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
  titleStyle?: CSSProperties;
};

/** Label row, then the heading and its lead side by side (they wrap below each other on small screens). */
export function SectionHead({ label, title, titleId, width, lead, leadWidth, below, titleStyle }: SectionHeadProps) {
  return (
    <>
      <SectionLabel>{label}</SectionLabel>
      <div className="head-row" style={below !== undefined ? { paddingBottom: below } : undefined}>
        <Heading id={titleId} text={title} width={width} style={titleStyle} />
        <Lead width={leadWidth}>{lead}</Lead>
      </div>
    </>
  );
}

/** Outer frame of an inner page (Contact, Blog, Legal, 404). */
export function Page({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="wrap page" style={style}>{children}</div>;
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
