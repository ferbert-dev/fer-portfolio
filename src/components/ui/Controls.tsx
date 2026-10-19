import type { CSSProperties, ReactNode } from 'react';
import { PauseIcon, PlayIcon } from './icons';

/**
 * A button that stays pressed (aria-pressed). One component for every toggle
 * on the site; the variant picks the look, defined once in globals.css:
 * - segment: compact pill inside a group (header theme switch)
 * - filter:  44px pill, inverted when pressed (blog filters)
 * - topic:   44px pill with a square marker, lime tint when pressed (contact topics)
 * - choice:  full-width card button, lime tint when pressed (document questions)
 */
export function ToggleChip({ pressed, onClick, variant, mono, className, style, children }: { pressed: boolean; onClick: () => void; variant: 'segment' | 'filter' | 'topic' | 'choice'; mono?: boolean; className?: string; style?: CSSProperties; children: ReactNode }) {
  const cls = ['chip', `chip-${variant}`, mono ? 'mono' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={pressed} onClick={onClick} style={style}>
      {variant === 'topic' ? <span className="chip-dot" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

/** Pause / Play control for anything that moves on its own (tool marquee, invoice workflow). */
export function PlayPauseButton({ paused, onToggle, label, ariaLabel, pressed, className }: { paused: boolean; onToggle: () => void; label: string; ariaLabel?: string; pressed?: boolean; className?: string }) {
  return (
    <button type="button" className={`mono qb ctl${className ? ` ${className}` : ''}`} onClick={onToggle} aria-label={ariaLabel} aria-pressed={pressed}>
      {paused ? <PlayIcon /> : <PauseIcon />}
      {label}
    </button>
  );
}

type PillTone = 'neutral' | 'accent' | 'tint' | 'onAccent' | 'good' | 'warn' | 'muted';
const toneClass: Record<PillTone, string> = { neutral: '', accent: 't-acc', tint: 't-tint', onAccent: 't-on-acc', good: 't-good', warn: 't-warn', muted: 't-muted' };

/** Small rounded label: tags, sources, dates, the "Recommended" badge, potential levels. */
export function Pill({ tone = 'neutral', mono = true, className, style, children }: { tone?: PillTone; mono?: boolean; className?: string; style?: CSSProperties; children: ReactNode }) {
  const cls = [mono ? 'mono' : '', 'pill', toneClass[tone], className ?? ''].filter(Boolean).join(' ');
  return <span className={cls} style={style}>{children}</span>;
}

/** Form field: mono label, the control, then an optional error (linked by errorId) and hint. */
export function Field({ htmlFor, label, error, errorId, hint, children }: { htmlFor: string; label: string; error?: string; errorId?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="fld">
      <label className="mono" htmlFor={htmlFor}>{label}</label>
      {children}
      {error ? <span id={errorId} className="sub fld-err">{error}</span> : null}
      {hint ? <span className="sub fld-hint">{hint}</span> : null}
    </div>
  );
}
