/** Icons drawn in the design. Decorative unless a label is passed by the caller. */

export function LogoMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M1 1h4v4H1zM1 9h4v4H1zM9 5h4v4H9z" />
    </svg>
  );
}

/** The stepped "pixel" arrow used in primary buttons and text links. */
export function PixelArrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M3 1h2v2H3zM5 3h2v2H5zM7 5h2v2H7zM9 6h2v2H9zM5 9h2v2H5zM3 11h2v2H3zM7 7h2v2H7z" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 2.5L8 6l-3.5 3.5" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="10" height="10" fill="currentColor" aria-hidden="true">
      <path d="M2 1v8l7-4z" />
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg width="10" height="10" fill="currentColor" aria-hidden="true">
      <rect x="1.5" y="1" width="2.6" height="8" />
      <rect x="6" y="1" width="2.6" height="8" />
    </svg>
  );
}

export function Tick({ size = 9, width = 1.8, path = 'M1.5 4.8l2 2L7.5 2.4' }: { size?: number; width?: number; path?: string }) {
  return (
    <svg width={size} height={size} fill="none" style={{ stroke: 'var(--acc-tx)' }} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/** Stroke icon from a path in an 18 or 20 unit box. */
export function StrokeIcon({ d, size = 18, stroke = 1.6 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
