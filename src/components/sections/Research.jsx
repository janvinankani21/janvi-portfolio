import { motion } from 'framer-motion';
import { BookOpen, Cpu, Microscope, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';

export default function Research() {
  const { research } = PORTFOLIO_DATA;

  return (
    <section
      id="research"
      className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-primary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-45" />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={research.kicker}
          headingPrefix={research.headingPrefix}
          headingHighlight={research.headingHighlight}
          subtitle={research.subtitle}
        />

        {/* Editorial Research Spotlight */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: 'var(--shadow-card-hover)' }}
          className="relative mt-14 overflow-hidden rounded-[30px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-7 sm:p-11"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-[var(--accent-contrast)]">
                  <Microscope className="h-3.5 w-3.5" />
                  {research.badge}
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
                  Dataset: {research.dataset}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] font-normal tracking-tight text-[var(--ink)]">
                “{research.title}”
              </h3>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                {research.summary}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-4 self-start rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] p-5 lg:col-span-4">
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Conference
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--ink)]">
                  {research.conference}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Role
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--ink)]">
                  {research.role}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Core Methods
                </dt>
                <dd className="mt-1 text-sm text-[var(--muted)]">
                  BERT · SHAP · Social Context Analysis
                </dd>
              </div>
            </dl>
          </div>

          {/* Research Architecture Pillars */}
          <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] pt-8 md:grid-cols-3">
            {research.pillars.map((pillar, idx) => {
              const Icon = idx === 0 ? BookOpen : idx === 1 ? Sparkles : Cpu;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] p-5"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{pillar.label}</span>
                  </div>
                  <p className="mt-2 font-serif text-2xl text-[var(--ink)]">
                    {pillar.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                    {pillar.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
