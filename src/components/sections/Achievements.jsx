import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Eye,
  GraduationCap,
  Microscope,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';

export default function Achievements({ onPreviewCertificate }) {
  const { experience, achievements, certifications } = PORTFOLIO_DATA;
  const { featured, items } = achievements;

  return (
    <section
      id="achievements"
      className="relative bg-[var(--bg-secondary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={achievements.kicker}
          headingPrefix={achievements.headingPrefix}
          headingHighlight={achievements.headingHighlight}
          subtitle={achievements.subtitle}
        />

        {/* Internship Experience Spotlight */}
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: 'var(--shadow-card)' }}
          className="mt-14 rounded-[26px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--accent)]">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Internship Experience
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[var(--ink)] sm:text-3xl">
                  {experience.role} · <span className="italic text-[var(--accent)]">{experience.company}</span>
                </h3>
              </div>
            </div>

            <span className="self-start rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] px-4 py-1.5 font-mono text-xs font-medium text-[var(--accent)] sm:self-center">
              {experience.duration}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {experience.summary}
          </p>
        </motion.article>

        {/* Featured Hackathon Recognition Card */}
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
          className="relative mt-6 overflow-hidden rounded-[28px] border border-[var(--border-subtle)] p-7 sm:p-10"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-3.5 py-1 text-xs font-semibold text-[var(--accent-contrast)] shadow-[0_6px_16px_rgba(118,82,200,0.28)]">
                  <Trophy className="h-3.5 w-3.5" />
                  {featured.rank}
                </span>
                <span className="font-mono text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
                  {featured.category}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06] font-normal tracking-tight text-[var(--ink)]">
                {featured.title}
              </h3>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                {featured.summary}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onPreviewCertificate(featured)}
                  data-cursor-label="CERT"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[0_10px_24px_-6px_rgba(118,82,200,0.42)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Certificate</span>
                </button>
              </div>
            </div>

            <dl
              style={{ boxShadow: 'var(--shadow-card)' }}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-5 backdrop-blur-md lg:col-span-4"
            >
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Hackathon
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--ink)]">
                  Smart India Hackathon (Internal, LJCCA)
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Result
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--ink)]">
                  2nd Position · Second SIH Participation
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Certificate Asset
                </dt>
                <dd className="mt-1 text-sm text-[var(--muted)]">
                  {featured.certificateImage
                    ? 'Certificate uploaded'
                    : 'Placeholder until scan/PDF uploaded'}
                </dd>
              </div>
            </dl>
          </div>
        </motion.article>

        {/* Achievements Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon =
              item.id === 'icmotarss-poster'
                ? Microscope
                : item.id === 'lj-innovation-village' || item.id === 'ai-creators-bootcamp'
                  ? Users
                  : item.id === 'laravel-fdp'
                    ? GraduationCap
                    : Sparkles;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx * 0.06, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="editorial-card flex flex-col justify-between rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] text-[var(--muted)]">
                      {item.date}
                    </span>
                  </div>

                  <p className="mt-5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                    {item.category}
                  </p>
                  <h4 className="mt-1.5 font-serif text-2xl font-normal tracking-tight text-[var(--ink)]">
                    {item.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                  <span className="truncate font-mono text-xs text-[var(--muted)]">
                    {item.issuer}
                  </span>
                  <button
                    type="button"
                    onClick={() => onPreviewCertificate(item)}
                    data-cursor-label="OPEN"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Certifications Gallery */}
        <div id="certifications" className="mt-20">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
                Certifications Gallery
              </p>
              <h3 className="mt-2 font-serif text-3xl text-[var(--ink)] sm:text-4xl">
                Verified courses &amp; <em className="italic text-[var(--accent)]">specializations</em>
              </h3>
            </div>
            <p className="font-mono text-xs text-[var(--muted)]">
              {certifications.length} credentials · Upload images or PDFs to enable preview
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, idx) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.04, 0.2),
                }}
                className="editorial-card flex flex-col justify-between rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-chip)] text-[var(--accent)]">
                      <Award className="h-4 w-4" />
                    </span>
                    <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
                      {cert.detail}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[10px] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase">
                    {cert.category}
                  </p>
                  <h4 className="mt-1 font-serif text-xl leading-snug text-[var(--ink)]">
                    {cert.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--muted)]">{cert.provider}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onPreviewCertificate({
                      ...cert,
                      issuer: cert.provider,
                      description: `${cert.title} (${cert.detail}) — Issued by ${cert.provider}.`,
                    })
                  }
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3.5 py-2 text-xs font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>
                    {cert.certificateImage ? 'View Certificate' : 'Certificate Slot'}
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
