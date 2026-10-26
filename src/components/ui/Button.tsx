import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { TrackTag } from '@/lib/analytics';
import { Chevron, PixelArrow } from './icons';

type ArrowIcon = 'pixel' | 'chevron';
const arrow = (icon: ArrowIcon, size?: number) => (icon === 'pixel' ? <PixelArrow size={size} /> : <Chevron />);

/**
 * The look of the primary button: the inverted label block plus the lime arrow
 * tile. Every primary action uses it, whatever element wraps it (link, submit
 * button, or a card that is itself the link).
 */
export function ButtonFace({ label, icon = 'pixel', scramble = false }: { label: ReactNode; icon?: ArrowIcon; scramble?: boolean }) {
  return (
    <>
      <span className="btn-l" {...(scramble ? { 'data-scr': '' } : {})}>{label}</span>
      <span className="btn-t" aria-hidden="true">{arrow(icon)}</span>
    </>
  );
}

/** Primary action: inverted label block plus a lime arrow tile. Hover sweeps to lime. */
export function PrimaryButton({ href, label, className, style, scramble = true, reveal = false, icon = 'pixel', onClick, track }: { href: string; label: string; className?: string; style?: CSSProperties; track?: TrackTag; scramble?: boolean; reveal?: boolean; icon?: ArrowIcon; onClick?: () => void }) {
  return (
    <Link href={href} className={className ? `btn ${className}` : 'btn'} aria-label={label} style={style} onClick={onClick} {...track} {...(reveal ? { 'data-rv': '' } : {})}>
      <ButtonFace label={label} icon={icon} scramble={scramble} />
    </Link>
  );
}

/** Primary button that submits a form. */
export function SubmitButton({ label, disabled }: { label: ReactNode; disabled?: boolean }) {
  return (
    <button type="submit" className="btn" disabled={disabled}>
      <ButtonFace label={label} icon="chevron" />
    </button>
  );
}

/** Outline button for a secondary action next to a primary one ("Watch an agent think"). */
export function OutlineButton({ href, children, track }: { href: string; children: ReactNode; track?: TrackTag }) {
  return <Link href={href} className="btn-o" {...track}>{children}</Link>;
}

/** The small round lime tile with an arrow, used by text links, cards and list rows. */
export function ArrowTile({ icon = 'chevron' }: { icon?: ArrowIcon }) {
  return <span className="lnk-t">{arrow(icon, 10)}</span>;
}

/** Mono text link with a round lime tile ("Write to us", "See a sample report"). */
export function ArrowLink({ href, children, className, style, reveal = false, track }: { href: string; children: ReactNode; className?: string; style?: CSSProperties; reveal?: boolean; track?: TrackTag }) {
  const inner = (
    <>
      {children}
      <span className="lnk-t" aria-hidden="true"><PixelArrow size={10} /></span>
    </>
  );
  const props = { className: className ? `lnk mono ${className}` : 'lnk mono', style, ...track, ...(reveal ? { 'data-rv': '' } : {}) };
  if (href.startsWith('/')) return <Link href={href} {...props}>{inner}</Link>;
  return <a href={href} {...props}>{inner}</a>;
}
