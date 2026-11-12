import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  MapPin,
  Terminal,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import ProfilePortrait from '../common/ProfilePortrait';
import ResumeDownloadButton from '../common/ResumeDownloadButton';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

export default function Hero({ ready = true, onPlaceholderLink }) {
  const { profile } = PORTFOLIO_DATA;
  const reducedMotion = useReducedMotionPref();
  const [roleIndex, setRoleIndex] = useState(0);
  const [clockText, setClockText] = useState('--:--:--');

  const { scrollY } = useScroll();
  const nameParallaxX = useTransform(scrollY, [0, 700], [0, -28]);
  const accentParallaxX = useTransform(scrollY, [0, 700], [0, 28]);
  const visualParallaxY = useTransform(scrollY, [0, 700], [0, 42]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.rotatingRoles.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [profile.rotatingRoles.length]);

  useEffect(() => {
    const updateClock = () => {
      try {
        setClockText(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
        );
      } catch {
        setClockText('IST');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSocialClick = (e, social) => {
    if (!social.url) {
      e.preventDefault();
      onPlaceholderLink?.({
        title: `${social.label} Profile Placeholder`,
        message: `Update profile.socials.${social.label.toLowerCase()}.url in src/data/portfolioData.js (${social.handle}).`,
      });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      style={{
        background:
          'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-primary) 72%, var(--bg-secondary) 100%)',
      }}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 transition-colors duration-300 sm:pt-32 sm:pb-20"
    >
      {/* Architectural lavender/plum grid + ambient radial halo */}
      <div className="hero-board pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[66vmin] w-[66vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--glow-hero) 0%, var(--accent-tint) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Technical HUD framing corners */}
      <div
        className="pointer-events-none absolute inset-x-3 bottom-3 top-[76px] mx-auto max-w-[1380px] sm:inset-x-6 sm:top-20 sm:bottom-4"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-0 h-5 w-5 border-l-[1.5px] border-t-[1.5px] border-[var(--border-strong)]" />
        <span className="absolute right-0 top-0 h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-[var(--border-strong)]" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b-[1.5px] border-l-[1.5px] border-[var(--border-strong)]" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b-[1.5px] border-r-[1.5px] border-[var(--border-strong)]" />

        <div className="hidden items-center justify-between px-4 pt-2 font-mono text-[10px] tracking-[0.16em] text-[var(--muted)] uppercase sm:flex">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            {profile.portfolioEdition} · {profile.location}
          </span>
          <span className="tabular-nums">
            IST <strong className="font-semibold text-[var(--accent)]">{clockText}</strong>
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 mx-auto grid w-[min(1200px,100%-32px)] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left editorial identity column */}
        <div className="lg:col-span-7">
          {/* Editable Status + Animated Role Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span
              style={{ boxShadow: 'var(--shadow-card)' }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-1.5 text-xs font-medium text-[var(--ink)]"
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>{profile.availability.label}</span>
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--accent-tint)] px-3.5 py-1.5 font-mono text-xs text-[var(--accent)]">
              <Terminal className="h-3.5 w-3.5" />
              <span className="relative inline-flex h-4 min-w-[154px] items-center overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={profile.rotatingRoles[roleIndex]}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="whitespace-nowrap font-semibold"
                  >
                    {profile.rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.div>

          {/* Monumental creative name typography */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
              {profile.heroRoleHeadline} <span className="text-[var(--accent)]">|</span> AI &amp; ML Enthusiast
            </p>
            <h1 className="mt-2 font-serif text-[clamp(3.6rem,10.5vw,7.4rem)] leading-[0.88] font-normal tracking-[-0.025em] text-[var(--ink)]">
              <motion.span
                style={reducedMotion ? undefined : { x: nameParallaxX }}
                className="block"
              >
                {profile.firstName}
              </motion.span>
              <motion.span
                style={reducedMotion ? undefined : { x: accentParallaxX }}
                className="block italic text-[var(--accent)]"
              >
                {profile.lastName}
                <span className="text-[var(--accent-soft)] not-italic">.</span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
          >
            “{profile.tagline}”
          </motion.p>

          {/* Primary CTA Buttons & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              data-cursor-label="PROJECTS"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] shadow-[0_14px_32px_-6px_rgba(118,82,200,0.42)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
            >
              <span>View My Projects</span>
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              data-cursor-label="TALK"
              style={{ boxShadow: 'var(--shadow-card)' }}
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <ResumeDownloadButton variant="secondary" />
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center gap-2.5"
          >
            <a
              href={profile.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleSocialClick(e, profile.socials.github)}
              aria-label="Janvi Nankani GitHub profile"
              style={{ boxShadow: 'var(--shadow-card)' }}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>

            <a
              href={profile.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleSocialClick(e, profile.socials.linkedin)}
              aria-label="Janvi Nankani LinkedIn profile"
              style={{ boxShadow: 'var(--shadow-card)' }}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 text-sm font-medium text-[var(--ink)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </motion.div>
        </div>

        {/* Right developer visual + portrait card */}
        <motion.div
          style={reducedMotion ? undefined : { y: visualParallaxY }}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-[430px]">
            <div
              className="pointer-events-none absolute -inset-2.5 rounded-[30px] border border-[var(--border-subtle)]"
              aria-hidden="true"
            />

            <ProfilePortrait
              avatarUrl={profile.avatarUrl}
              alt={profile.avatarAlt}
              monogram={profile.monogram}
              variant="hero"
            />

            {/* Floating developer animated code snippet card */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: 'var(--shadow-card-hover)' }}
              className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4 backdrop-blur-xl sm:absolute sm:-bottom-9 sm:-left-10 sm:mt-0 sm:w-[278px]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  <Code2 className="h-3.5 w-3.5" />
                  janvi.stack.ts
                </span>
                <span className="flex gap-1" aria-hidden="true">
                  <i className="h-2 w-2 rounded-full bg-[var(--accent-soft)]" />
                  <i className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
              </div>
              <pre className="mt-2.5 overflow-x-auto font-mono text-[11px] leading-relaxed text-[var(--ink)]">
                <code>
                  <span className="text-[var(--muted)]">const</span>{' '}
                  <span className="font-semibold text-[var(--accent)]">focus</span> = {'{\n'}
                  {'  '}web: [<span className="text-[var(--accent)]">&quot;React&quot;</span>,{' '}
                  <span className="text-[var(--accent)]">&quot;TS&quot;</span>,{' '}
                  <span className="text-[var(--accent)]">&quot;Node&quot;</span>],{'\n'}
                  {'  '}ai: [<span className="text-[var(--accent)]">&quot;Python&quot;</span>,{' '}
                  <span className="text-[var(--accent)]">&quot;BERT&quot;</span>,{' '}
                  <span className="text-[var(--accent)]">&quot;GenAI&quot;</span>]{'\n'}
                  {'}'};
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll prompt */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="mx-auto mt-14 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--accent)] lg:mt-16"
      >
        <span>Scroll to explore</span>
        <span className="inline-block h-4 w-[1px] bg-[var(--border-strong)]" />
        <span className="text-[var(--accent)]">↓</span>
      </motion.button>
    </section>
  );
}
