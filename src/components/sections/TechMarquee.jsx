import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function TechMarquee() {
  const items = PORTFOLIO_DATA.marqueeItems;

  return (
    <div
      className="marquee-container relative z-10 overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-4 transition-colors duration-300 select-none"
      aria-label="Core Technologies and Focus Areas"
    >
      <div className="marquee-track items-center">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="flex items-center gap-6 px-5 font-serif text-2xl tracking-tight text-[var(--ink)] sm:text-3xl md:text-4xl"
              >
                <span>{item}</span>
                <span className="font-mono text-sm text-[var(--accent)]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
