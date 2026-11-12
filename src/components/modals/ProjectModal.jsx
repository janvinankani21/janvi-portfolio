import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Info, Sparkles, X } from 'lucide-react';
import { GitHubIcon } from '../common/BrandIcons';
import ProjectArtwork from '../sections/ProjectArtwork';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{ backgroundColor: 'var(--bg-modal-backdrop)' }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.16 } }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: 'var(--shadow-card-hover)' }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--ink)]"
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-6 py-4 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                  {project.index}
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-0.5 font-mono text-[11px] font-medium text-[var(--accent)]">
                  {project.category}
                </span>
                {project.highlightBadge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-tint)] px-3 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                    <Sparkles className="h-3 w-3" />
                    {project.highlightBadge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Thumbnail preview */}
            <div className="h-64 w-full border-b border-[var(--border-subtle)] sm:h-72">
              <ProjectArtwork project={project} />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                {project.status}
              </p>
              <h3
                id="project-modal-title"
                className="mt-2 font-serif text-3xl font-normal tracking-tight text-[var(--ink)] sm:text-4xl"
              >
                {project.name}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                {project.overview}
              </p>

              {/* Key Highlights */}
              <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] p-5">
                <h4 className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Key Features &amp; Scope
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[var(--ink)]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="font-mono text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
                  Technologies &amp; Focus Areas
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-xs font-medium text-[var(--ink)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links (only linked when real URLs are configured) */}
              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                {project.liveUrl || project.repoUrl ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[0_10px_24px_-6px_rgba(118,82,200,0.42)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
                      >
                        <span>Open Live Demo</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        <span>View GitHub Repo</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-chip)] p-4 text-xs leading-relaxed text-[var(--muted)]">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>
                      Direct repository and live demo URLs are not attached yet. Add{' '}
                      <code className="font-mono text-[var(--accent)]">repoUrl</code> or{' '}
                      <code className="font-mono text-[var(--accent)]">liveUrl</code> in{' '}
                      <code className="font-mono text-[var(--ink)]">src/data/portfolioData.js</code>{' '}
                      when ready.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
