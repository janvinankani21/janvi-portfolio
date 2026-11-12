import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';
import ProfilePortrait from '../common/ProfilePortrait';
import { LinkedInIcon } from '../common/BrandIcons';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

function IlluminatedWord({ word, index, total, progress, reducedMotion }) {
  const start = (index / total) * 0.72;
  const end = Math.min(1, start + 0.16);
  const opacity = useTransform(progress, [start, end], [0.24, 1]);

  if (reducedMotion) {
    return <span className="mr-[0.26em] inline-block text-[var(--ink)]">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.26em] inline-block text-[var(--ink)]"
    >
      {word}
    </motion.span>
  );
}

export default function About() {
  const { about, profile } = PORTFOLIO_DATA;
  const reducedMotion = useReducedMotionPref();
  const manifestoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = about.scrollManifesto.split(/\s+/);

  return (
    <section
      id="about"
      className="relative bg-[var(--bg-primary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={about.kicker}
          headingPrefix={about.headingPrefix}
          headingHighlight={about.headingHighlight}
        />

        {/* Scroll-illuminated editorial manifesto */}
        <div
          ref={manifestoRef}
          className="mt-10 border-b border-[var(--border-subtle)] pb-14 sm:mt-14 sm:pb-16"
        >
          <p className="font-serif text-[clamp(1.7rem,3.6vw,3.1rem)] leading-[1.16] tracking-[-0.01em]">
            {words.map((word, idx) => (
              <IlluminatedWord
                key={`${word}-${idx}`}
                word={word}
                index={idx}
                total={words.length}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </p>
        </div>

        {/* Creative Editorial Grid: Editable Profile Spotlight + 4 Story Blocks */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ boxShadow: 'var(--shadow-card)' }}
            className="flex flex-col justify-between gap-6 rounded-[26px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition-colors duration-300 lg:col-span-4"
          >
            <ProfilePortrait
              avatarUrl={profile.avatarUrl}
              alt={profile.avatarAlt}
              monogram={profile.monogram}
              variant="about"
            />

            <div className="space-y-3 border-t border-[var(--border-subtle)] pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono tracking-[0.12em] text-[var(--muted)] uppercase">
                  Name
                </span>
                <span className="font-semibold text-[var(--ink)]">{profile.fullName}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-mono tracking-[0.12em] text-[var(--muted)] uppercase">
                  Focus
                </span>
                <span className="text-right font-medium text-[var(--accent)]">
                  Software &amp; AI/ML
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-mono tracking-[0.12em] text-[var(--muted)] uppercase">
                  <MapPin className="h-3 w-3 text-[var(--accent)]" />
                  Location
                </span>
                <span className="text-right text-[var(--ink)]">{profile.location}</span>
              </div>

              <a
                href={profile.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Janvi Nankani on LinkedIn"
                className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-contrast)] shadow-[0_8px_20px_-6px_rgba(118,82,200,0.42)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Editorial 2x2 Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {about.editorialCards.map((card, i) => (
              <motion.article
                key={card.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="editorial-card flex flex-col justify-between rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">
                    {card.index}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-2xl font-normal tracking-tight text-[var(--ink)] sm:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Architectural Hairline Focus Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: 'var(--shadow-card)' }}
          className="mt-10 grid grid-cols-1 gap-[1px] overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3"
        >
          {about.focusPillars.map((pillar) => (
            <div
              key={pillar.label}
              className="bg-[var(--bg-card)] p-6 transition-colors duration-300 sm:p-7"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase">
                {pillar.label}
              </span>
              <p className="mt-2 font-serif text-3xl text-[var(--accent)] sm:text-4xl">
                {pillar.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {pillar.note}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
