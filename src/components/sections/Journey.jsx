import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

export default function Journey() {
  const { journey } = PORTFOLIO_DATA;
  const reducedMotion = useReducedMotionPref();
  const timelineRef = useRef(null);
  const [selectedId, setSelectedId] = useState(journey.milestones[0].id);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.7', 'end 0.75'],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleJump = (id) => {
    setSelectedId(id);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="journey"
      className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={journey.kicker}
          headingPrefix={journey.headingPrefix}
          headingHighlight={journey.headingHighlight}
          subtitle={journey.subtitle}
        />

        {/* Quick interactive milestone index strip */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          aria-label="Timeline quick jump"
        >
          {journey.milestones.map((m) => {
            const active = selectedId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleJump(m.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent)] font-semibold text-[var(--accent-contrast)] shadow-[0_6px_16px_rgba(118,82,200,0.28)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--ink)]'
                }`}
              >
                <span>{m.step}</span>
                <span className="hidden sm:inline">· {m.when}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Timeline Spine + Milestones */}
        <div ref={timelineRef} className="relative mt-12 pl-8 sm:pl-14">
          {/* Static background rail */}
          <div
            className="absolute bottom-4 left-3 top-4 w-[2px] rounded-full bg-[var(--border-subtle)] sm:left-5"
            aria-hidden="true"
          />

          {/* Scroll-triggered glowing purple spine */}
          <motion.div
            className="absolute left-3 top-4 w-[2px] origin-top rounded-full bg-gradient-to-b from-[var(--accent-soft)] via-[var(--accent)] to-[var(--accent)] sm:left-5"
            style={{
              height: reducedMotion ? '100%' : spineHeight,
              boxShadow: '0 0 12px rgba(182, 154, 232, 0.5)',
            }}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {journey.milestones.map((milestone, idx) => {
              const isSelected = selectedId === milestone.id;
              return (
                <motion.article
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  initial={{ opacity: 0, x: -16, y: 18 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(idx * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setSelectedId(milestone.id)}
                  style={{
                    boxShadow: isSelected
                      ? 'var(--shadow-card-hover)'
                      : 'var(--shadow-card)',
                  }}
                  className={`group relative cursor-pointer rounded-[24px] border bg-[var(--bg-card)] p-6 transition-all duration-300 sm:p-7 ${
                    isSelected
                      ? 'border-[var(--border-strong)]'
                      : 'border-[var(--border-subtle)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]'
                  }`}
                >
                  {/* Timeline Node Dot */}
                  <span
                    className={`absolute -left-[27px] top-8 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors sm:-left-[43px] ${
                      isSelected
                        ? 'border-[var(--bg-card)] bg-[var(--accent)] shadow-[0_0_14px_rgba(182,154,232,0.7)]'
                        : 'border-[var(--accent)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent)]'
                    }`}
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                          {milestone.step}
                        </span>
                        <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
                          {milestone.phase}
                        </span>
                      </div>
                      <p className="mt-2 font-serif text-2xl text-[var(--ink)]">
                        {milestone.when}
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <h3 className="font-serif text-2xl font-normal tracking-tight text-[var(--ink)] sm:text-[1.75rem]">
                        {milestone.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
                        {milestone.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--ink)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
