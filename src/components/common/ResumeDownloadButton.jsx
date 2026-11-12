import { Download, FileClock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useResumeAvailability } from '../../hooks/useResumeAvailability';

export default function ResumeDownloadButton({ variant = 'secondary' }) {
  const { resume } = PORTFOLIO_DATA.profile;
  const available = useResumeAvailability(resume.url);

  if (available) {
    return (
      <a
        href={resume.url}
        download={resume.fileName}
        data-cursor-label="PDF"
        style={variant === 'secondary' ? { boxShadow: 'var(--shadow-card)' } : undefined}
        className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
          variant === 'primary'
            ? 'bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_14px_32px_-6px_rgba(118,82,200,0.42)] hover:bg-[var(--accent-hover)]'
            : 'border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        <Download className="h-4 w-4 text-[var(--accent)]" />
        <span>Download Resume</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="Resume download activates once public/files/janvi-nankani-resume.pdf is added."
      className="inline-flex min-h-[48px] cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-[var(--border-strong)] bg-[var(--bg-chip)] px-5 py-3 text-sm font-medium text-[var(--muted)] opacity-80"
    >
      <FileClock className="h-4 w-4 text-[var(--accent)]" />
      <span>Download Resume (PDF Pending)</span>
    </button>
  );
}
