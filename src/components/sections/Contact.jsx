import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Info,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../common/BrandIcons';
import ResumeDownloadButton from '../common/ResumeDownloadButton';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import ScrambleText from '../common/ScrambleText';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';
import { useTheme } from '../../context/ThemeContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ onPlaceholderLink }) {
  const { contact, profile } = PORTFOLIO_DATA;
  const reducedMotion = useReducedMotionPref();
  const { isDark } = useTheme();
  const canvasRef = useRef(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: 'idle',
    text: '',
  });
  const [validatedSnapshot, setValidatedSnapshot] = useState(null);

  const hasEmail = Boolean(contact.email);

  // Ambient floating lavender/violet dust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let particles = [];
    let rafId = null;
    let isVisible = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.round(rect.width / 26));
      particles = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.35 + 0.12,
        alpha: Math.random() * 0.34 + 0.14,
        even: idx % 2 === 0,
      }));
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const p of particles) {
        if (!reducedMotion) {
          p.y -= p.speed;
          if (p.y < -6) {
            p.y = rect.height + 6;
            p.x = Math.random() * rect.width;
          }
        }
        ctx.fillStyle = p.even ? '#7652C8' : '#B69AE8';
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (isVisible && !reducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          if (rafId) window.cancelAnimationFrame(rafId);
          draw();
        } else if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isDark]);

  const validate = () => {
    const nextErrors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (status.type !== 'idle') {
      setStatus({ type: 'idle', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({
        type: 'error',
        text: 'Please review the highlighted fields before continuing.',
      });
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!contact.formEndpoint) {
      setValidatedSnapshot(payload);
      setStatus({
        type: 'placeholder-validated',
        text: hasEmail
          ? 'Your message passed validation, but no live backend or email service is configured yet. Use your email app below or copy the formatted message.'
          : 'Your message passed validation, and no backend or email address is configured yet. Copy the formatted message below or reach out via LinkedIn / GitHub.',
      });
      return;
    }

    setStatus({ type: 'submitting', text: 'Sending message...' });
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned an error response');
      }

      setStatus({
        type: 'sent',
        text: 'Message delivered successfully. Thank you for reaching out!',
      });
      setForm({ name: '', email: '', message: '' });
      setValidatedSnapshot(null);
    } catch {
      setStatus({
        type: 'error',
        text: 'Unable to reach the configured email endpoint right now. Please try LinkedIn or copy your message below.',
      });
    }
  };

  const handleCopyEmail = async () => {
    if (!hasEmail) {
      onPlaceholderLink?.({
        title: 'Email Placeholder',
        message: 'Set contact.email in src/data/portfolioData.js to enable email actions.',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      onPlaceholderLink?.({
        title: 'Copy Email',
        message: `Email address: ${contact.email}`,
      });
    }
  };

  const handleCopyFormattedMessage = async () => {
    if (!validatedSnapshot) return;
    const formatted = `Name: ${validatedSnapshot.name}\nEmail: ${validatedSnapshot.email}\n\nMessage:\n${validatedSnapshot.message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedMessage(true);
      window.setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // ignore clipboard restriction
    }
  };

  const mailtoHref =
    hasEmail && validatedSnapshot
      ? `mailto:${contact.email}?subject=${encodeURIComponent(
          `Portfolio Inquiry from ${validatedSnapshot.name}`
        )}&body=${encodeURIComponent(
          `Name: ${validatedSnapshot.name}\nEmail: ${validatedSnapshot.email}\n\n${validatedSnapshot.message}`
        )}`
      : hasEmail
        ? `mailto:${contact.email}`
        : undefined;

  return (
    <section
      id="contact"
      style={{
        background:
          'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-card-alt) 50%, var(--bg-primary) 100%)',
      }}
      className="relative overflow-hidden border-t border-[var(--border-subtle)] py-24 transition-colors duration-300 sm:py-32"
    >
      {/* Floating violet/lavender dust canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-32px)]">
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
          <span className="inline-block h-[1.5px] w-7 bg-[var(--accent)]" />
          <ScrambleText text={contact.kicker} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-normal tracking-[-0.02em] text-[var(--ink)]"
        >
          Let&apos;s Connect and Build{' '}
          <em className="italic text-[var(--accent)]">Something Meaningful.</em>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-[var(--muted)]">
                {contact.subtext}
              </p>

              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3.5 py-1.5 font-mono text-xs text-[var(--ink)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{profile.location}</span>
              </p>

              {/* Email Placeholder Card (Honest — does not invent an email) */}
              <div
                style={{ boxShadow: 'var(--shadow-card)' }}
                className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent)] uppercase">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </span>
                  {!hasEmail && (
                    <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
                      Placeholder
                    </span>
                  )}
                </div>

                {hasEmail ? (
                  <>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-3 block break-all font-serif text-2xl text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                    >
                      {contact.email}
                    </a>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
                      >
                        <span>Open Mail App</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="mt-3 font-mono text-xs leading-relaxed text-[var(--muted)]">
                    Email address placeholder — configure{' '}
                    <code className="text-[var(--accent)]">contact.email</code> in{' '}
                    <span className="text-[var(--ink)]">src/data/portfolioData.js</span>.
                  </p>
                )}
              </div>

              {/* GitHub & LinkedIn Cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={profile.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-chip)] text-[var(--accent)]">
                      <GitHubIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--ink)]">GitHub</p>
                      <p className="truncate font-mono text-[11px] text-[var(--muted)]">
                        {profile.socials.github.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                </a>

                <a
                  href={profile.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-chip)] text-[var(--accent)]">
                      <LinkedInIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--ink)]">LinkedIn</p>
                      <p className="truncate font-mono text-[11px] text-[var(--muted)]">
                        {profile.socials.linkedin.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                </a>
              </div>

              {/* Resume Download in Contact Section */}
              <div className="pt-1">
                <ResumeDownloadButton variant="secondary" />
              </div>
            </div>

            <p className="font-mono text-xs leading-relaxed text-[var(--muted)]">
              {contact.responseNote}
            </p>
          </motion.div>

          {/* Right Validated Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ boxShadow: 'var(--shadow-card-hover)' }}
            className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-6 backdrop-blur-md sm:p-8 lg:col-span-7"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-mono text-xs font-semibold tracking-[0.12em] text-[var(--ink)] uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full rounded-xl border bg-[var(--bg-chip)] px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--muted)]/70 transition-colors focus:bg-[var(--bg-card)] focus:outline-none ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className={`mt-1.5 text-xs font-medium ${
                        isDark ? 'text-rose-300' : 'text-rose-600'
                      }`}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-xs font-semibold tracking-[0.12em] text-[var(--ink)] uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full rounded-xl border bg-[var(--bg-chip)] px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--muted)]/70 transition-colors focus:bg-[var(--bg-card)] focus:outline-none ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className={`mt-1.5 text-xs font-medium ${
                        isDark ? 'text-rose-300' : 'text-rose-600'
                      }`}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs font-semibold tracking-[0.12em] text-[var(--ink)] uppercase"
                  >
                    Message
                  </label>
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {form.message.trim().length} chars
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  value={form.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full resize-y rounded-xl border bg-[var(--bg-chip)] px-4 py-3 text-sm text-[var(--ink)] placeholder-[var(--muted)]/70 transition-colors focus:bg-[var(--bg-card)] focus:outline-none ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-[var(--border-subtle)] focus:border-[var(--accent)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className={`mt-1.5 text-xs font-medium ${
                      isDark ? 'text-rose-300' : 'text-rose-600'
                    }`}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honest Validation / Submission Feedback Banner */}
              {status.type === 'error' && (
                <div
                  role="alert"
                  className={`flex items-start gap-2.5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isDark
                      ? 'border-rose-400/40 bg-rose-950/50 text-rose-200'
                      : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>{status.text}</span>
                </div>
              )}

              {status.type === 'sent' && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-chip)] p-4 text-xs leading-relaxed text-[var(--ink)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <span>{status.text}</span>
                </div>
              )}

              {status.type === 'placeholder-validated' && (
                <div
                  role="status"
                  className="space-y-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-chip)] p-4 text-xs leading-relaxed text-[var(--ink)]"
                >
                  <div className="flex items-start gap-2.5">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <p>{status.text}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {mailtoHref && (
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Send via Email App</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleCopyFormattedMessage}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status.type === 'submitting'}
                  data-cursor-label="SEND"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--accent-contrast)] shadow-[0_14px_30px_-6px_rgba(118,82,200,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {status.type === 'submitting'
                      ? 'Sending...'
                      : contact.formEndpoint
                        ? 'Send Message'
                        : 'Validate & Prepare Message'}
                  </span>
                </button>

                <span className="font-mono text-[11px] text-[var(--muted)]">
                  {contact.formEndpoint
                    ? 'Connected to live endpoint'
                    : 'No backend configured · Safe validation mode'}
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
