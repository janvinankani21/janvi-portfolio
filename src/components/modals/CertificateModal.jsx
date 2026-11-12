import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Award, FileBadge, ImageOff, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function CertificateModal({ certificate, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    if (!certificate) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [certificate, onClose]);

  const assetPath = certificate?.certificateImage || '';
  const isPdf = assetPath.toLowerCase().endsWith('.pdf');
  const showRealAsset = Boolean(assetPath) && !imgError;

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{ backgroundColor: 'var(--bg-modal-backdrop)' }}
          className="fixed inset-0 z-[105] flex items-center justify-center p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.16 } }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: 'var(--shadow-card-hover)' }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-[var(--ink)] sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2.5">
                <FileBadge className="h-5 w-5 text-[var(--accent)]" />
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  Credential Preview
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Real Certificate Image/PDF or Honest Pending Slot */}
            <div className="mt-6">
              {showRealAsset ? (
                isPdf ? (
                  <div className="space-y-3">
                    <iframe
                      src={assetPath}
                      title={`${certificate.title} PDF`}
                      className="h-[420px] w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)]"
                    />
                    <a
                      href={assetPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                    >
                      <span>Open Certificate PDF in New Tab</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)]">
                    <img
                      src={assetPath}
                      alt={`${certificate.title} certificate`}
                      onError={() => setImgError(true)}
                      className="max-h-[420px] w-full object-contain"
                    />
                  </div>
                )
              ) : (
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, var(--bg-chip) 0%, var(--bg-card) 55%, var(--bg-card-alt) 100%)',
                  }}
                  className="relative overflow-hidden rounded-2xl border border-dashed border-[var(--border-strong)] p-6 sm:p-8"
                >
                  <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />

                  <div className="relative z-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-5 text-center shadow-sm backdrop-blur-sm sm:p-7">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] text-[var(--accent)]">
                      <Award className="h-6 w-6" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                      <ImageOff className="h-3 w-3" />
                      Certificate File Not Uploaded Yet
                    </span>

                    <p className="mt-4 font-serif text-2xl italic text-[var(--ink)]">
                      {PORTFOLIO_DATA.profile.fullName}
                    </p>

                    <h4
                      id="cert-modal-title"
                      className="mt-2 font-serif text-xl text-[var(--accent)] sm:text-2xl"
                    >
                      {certificate.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-[var(--muted)]">
                      {certificate.issuer || certificate.provider}
                    </p>

                    <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
                      To display the actual certificate image or PDF here, place the file in{' '}
                      <code className="text-[var(--accent)]">public/</code> and set{' '}
                      <code className="text-[var(--accent)]">certificateImage</code> in{' '}
                      <span className="text-[var(--ink)]">src/data/portfolioData.js</span>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Metadata summary */}
            <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {certificate.summary || certificate.description}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
