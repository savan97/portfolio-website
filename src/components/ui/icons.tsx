type IconProps = { className?: string };

/** Diagonal arrow — used for outbound links. */
export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/** Straight arrow pointing down — used for in-page cues. */
export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
