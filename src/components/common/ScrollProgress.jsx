import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const { progress } = useScrollProgress();
  const pct = Math.round(progress * 100);

  return (
    <>
      {/* Sleek top progress indicator */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[2.5px] bg-[var(--border-subtle)]"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-soft)] via-[var(--accent)] to-[var(--accent)] transition-[width] duration-100 ease-out"
          style={{
            width: `${progress * 100}%`,
          }}
        />
      </div>

      {/* Subtle vertical scroll readout on large screens */}
      <div
        className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--muted)] tabular-nums">
          {String(pct).padStart(2, '0')}
        </span>
        <div className="relative h-24 w-[2px] overflow-hidden rounded-full bg-[var(--border-subtle)]">
          <div
            className="w-full rounded-full bg-gradient-to-b from-[var(--accent-soft)] to-[var(--accent)]"
            style={{
              height: `${progress * 100}%`,
            }}
          />
        </div>
        <span className="font-mono text-[10px] font-medium text-[var(--accent)]">%</span>
      </div>
    </>
  );
}
