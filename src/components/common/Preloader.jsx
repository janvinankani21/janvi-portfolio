import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function Preloader({ onComplete }) {
  const reducedMotion = useReducedMotionPref();
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(() => !reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      onComplete?.();
      return undefined;
    }

    let rafId = null;
    const duration = 720;
    const start = performance.now();

    const step = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const value = Math.round(eased * 100);
      setPercent(value);

      if (elapsed < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setPercent(100);
        window.setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 90);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col justify-between bg-[var(--bg-primary)] px-6 py-8 text-[var(--ink)] md:px-12 md:py-12"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute right-10 top-10 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--glow-hero), transparent 70%)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-[var(--muted)] uppercase">
            <span className="flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
              {PORTFOLIO_DATA.profile.portfolioEdition}
            </span>
            <span>INITIALIZING EXPERIENCE</span>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
                  {PORTFOLIO_DATA.profile.role}
                </p>
                <p className="mt-2 font-serif text-4xl tracking-tight text-[var(--ink)] md:text-5xl">
                  {PORTFOLIO_DATA.profile.firstName}{' '}
                  <span className="italic text-[var(--accent)]">
                    {PORTFOLIO_DATA.profile.lastName}
                  </span>
                </p>
              </div>

              <div className="font-serif text-[clamp(4.5rem,16vw,12rem)] leading-[0.82] tracking-tight text-[var(--accent)] tabular-nums">
                {String(percent).padStart(2, '0')}
                <span className="ml-1 font-mono text-xl text-[var(--muted)]">%</span>
              </div>
            </div>

            <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--accent-soft)] to-[var(--accent)] transition-[width] duration-75"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
