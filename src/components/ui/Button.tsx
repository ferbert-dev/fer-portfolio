import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { PixelArrow } from './icons';

/** Primary action: inverted label block plus a lime arrow tile. Hover sweeps to lime. */
export function PrimaryButton({ href, label, style, scramble = true, reveal = false }: { href: string; label: string; style?: CSSProperties; scramble?: boolean; reveal?: boolean }) {
  return (
    <Link href={href} className="btn" aria-label={label} style={style} {...(reveal ? { 'data-rv': '' } : {})}>
      <span className="btn-l" {...(scramble ? { 'data-scr': '' } : {})}>{label}</span>
      <span className="btn-t" aria-hidden="true"><PixelArrow /></span>
    </Link>
  );
}

/** Mono text link with a round lime tile ("Write to us", "See a sample report"). */
export function ArrowLink({ href, children, style, reveal = false }: { href: string; children: ReactNode; style?: CSSProperties; reveal?: boolean }) {
  const inner = (
    <>
      {children}
      <span className="lnk-t" aria-hidden="true"><PixelArrow size={10} /></span>
    </>
  );
  const props = { className: 'lnk mono', style, ...(reveal ? { 'data-rv': '' } : {}) };
  if (href.startsWith('/')) return <Link href={href} {...props}>{inner}</Link>;
  return <a href={href} {...props}>{inner}</a>;
}
