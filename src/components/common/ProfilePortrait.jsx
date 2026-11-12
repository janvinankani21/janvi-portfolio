import { useState } from 'react';
import { Code2, ImageOff, Sparkles, UserCheck } from 'lucide-react';

export default function ProfilePortrait({
  avatarUrl,
  alt,
  monogram = 'JN',
  variant = 'hero',
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(avatarUrl) && !imgError;

  if (showImage) {
    return (
      <div
        style={{ boxShadow: 'var(--shadow-card-hover)' }}
        className={`relative w-full overflow-hidden rounded-[26px] border-2 border-[var(--border-subtle)] bg-[var(--bg-card)] ${
          variant === 'hero'
            ? 'aspect-[4/4.2] max-h-[450px]'
            : 'aspect-[4/3.6] max-h-[340px]'
        }`}
      >
        <img
          src={avatarUrl}
          alt={alt}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120F1B]/25 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div
      style={{ boxShadow: 'var(--shadow-card-hover)' }}
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 ${
        variant === 'hero' ? 'min-h-[360px] sm:min-h-[410px]' : 'min-h-[300px]'
      }`}
    >
      {/* Subtle architectural dot grid & soft violet ambient glows */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-65" />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, var(--accent-tint), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top HUD bar */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--accent)] uppercase">
          <UserCheck className="h-3 w-3" />
          Profile Photo Placeholder
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--muted)]">
          <ImageOff className="h-3 w-3" />
          Add JPEG
        </span>
      </div>

      {/* Central kinetic developer-themed portrait emblem */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
          <div
            className="animate-orbit absolute inset-0 rounded-full border border-dashed border-[var(--border-strong)]"
            aria-hidden="true"
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(182,154,232,0.7)]" />
          </div>

          <div
            className="animate-orbit-reverse absolute inset-4 rounded-full border border-[var(--border-subtle)]"
            aria-hidden="true"
          >
            <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-[var(--accent-soft)]" />
          </div>

          <div
            style={{ boxShadow: 'var(--shadow-card)' }}
            className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[var(--border-strong)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-chip)]"
          >
            <span className="font-serif text-5xl italic leading-none tracking-tight text-[var(--accent)]">
              {monogram}
            </span>
            <span className="mt-1 font-mono text-[9px] tracking-[0.18em] text-[var(--muted)] uppercase">
              JANVI · DEV
            </span>
          </div>

          <div
            style={{ boxShadow: 'var(--shadow-card)' }}
            className="absolute -right-4 top-2 flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink)] backdrop-blur-sm"
          >
            <Code2 className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>&lt;Builder /&gt;</span>
          </div>
        </div>

        {variant !== 'hero' && (
          <p className="mt-4 max-w-[230px] font-mono text-[10px] leading-relaxed text-[var(--muted)]">
            Place <code className="text-[var(--accent)]">janvi-profile.jpeg</code> inside{' '}
            <span className="text-[var(--ink)]">public/images/</span>
          </p>
        )}
      </div>

      {/* Bottom caption */}
      <div className="relative z-10 flex items-center justify-end gap-2 pt-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
          <Sparkles className="h-3 w-3 text-[var(--accent)]" />
          /images/janvi-profile.jpeg
        </span>
      </div>
    </div>
  );
}
