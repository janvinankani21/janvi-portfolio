import { motion } from 'framer-motion';
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';

export default function Education() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative bg-[var(--bg-secondary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={education.kicker}
          headingPrefix={education.headingPrefix}
          headingHighlight={education.headingHighlight}
          subtitle={education.subtitle}
        />

        {/* Academic Profile Card */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            boxShadow: 'var(--shadow-card)',
            background:
              'linear-gradient(135deg, var(--bg-card-alt) 0%, var(--bg-card) 55%, var(--bg-card-alt) 100%)',
          }}
          className="mt-14 overflow-hidden rounded-[28px] border border-[var(--border-subtle)] p-7 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3.5 py-1 text-xs font-semibold text-[var(--accent-contrast)]">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Undergraduate Degree
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
                  <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {education.duration}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-[clamp(2rem,4vw,3.15rem)] leading-[1.05] font-normal tracking-tight text-[var(--ink)]">
                {education.degree}
              </h3>

              <p className="mt-3 inline-flex items-center gap-2 text-base font-medium text-[var(--muted)]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                <span>
                  {education.college} · {education.university}
                </span>
              </p>
            </div>

            {/* Academic Highlights Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {education.highlights.map((item) => (
                <div
                  key={item.label}
                  style={{ boxShadow: 'var(--shadow-card)' }}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-5 py-4"
                >
                  <div>
                    <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">{item.detail}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 font-serif text-2xl text-[var(--ink)] sm:text-3xl">
                    <Award className="h-4 w-4 text-[var(--accent)]" />
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="mt-10 border-t border-[var(--border-subtle)] pt-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {education.timeline.map((step, idx) => (
                <motion.div
                  key={step.period}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
                >
                  <span className="inline-block rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)]">
                    {step.period}
                  </span>
                  <h4 className="mt-3 font-serif text-xl text-[var(--ink)]">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                    {step.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
