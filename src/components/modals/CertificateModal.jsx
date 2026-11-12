import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileBadge,
  FileText,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

function getRecognitionPhrase(certificate) {
  const docType = (certificate?.documentType || '').toLowerCase();
  if (
    docType.includes('achievement') ||
    docType.includes('leadership') ||
    docType.includes('presentation') ||
    docType.includes('appreciation')
  ) {
    return 'in recognition of';
  }
  return 'has successfully completed';
}

export default function CertificateModal({
  certificate,
  certificates = [],
  onSelectCertificate,
  onClose,
}) {
  const [imgError, setImgError] = useState(false);

  const currentIndex = certificate
    ? certificates.findIndex((item) => item.id === certificate.id)
    : -1;
  const hasMultiple = certificates.length > 1 && currentIndex !== -1;

  const goPrev = () => {
    if (!hasMultiple || !onSelectCertificate) return;
    const prevIdx = (currentIndex - 1 + certificates.length) % certificates.length;
    onSelectCertificate(certificates[prevIdx]);
  };

  const goNext = () => {
    if (!hasMultiple || !onSelectCertificate) return;
    const nextIdx = (currentIndex + 1) % certificates.length;
    onSelectCertificate(certificates[nextIdx]);
  };

  useEffect(() => {
    setImgError(false);
    if (!certificate) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasMultiple && onSelectCertificate) {
        const prevIdx = (currentIndex - 1 + certificates.length) % certificates.length;
        onSelectCertificate(certificates[prevIdx]);
      }
      if (e.key === 'ArrowRight' && hasMultiple && onSelectCertificate) {
        const nextIdx = (currentIndex + 1) % certificates.length;
        onSelectCertificate(certificates[nextIdx]);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [certificate, currentIndex, certificates, hasMultiple, onSelectCertificate, onClose]);

  const assetPath = certificate?.certificateImage || '';
  const isPdf = assetPath.toLowerCase().endsWith('.pdf');
  const showRealAsset = Boolean(assetPath) && !imgError;
  const issuerName = certificate?.issuer || certificate?.provider || '';
  const scopeLabel =
    certificate?.credentialScope || certificate?.detail || certificate?.date || certificate?.category;
  const topics = Array.isArray(certificate?.topics) ? certificate.topics : [];
  const resumeUrl = PORTFOLIO_DATA.profile.resume?.url;

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
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-[var(--ink)] sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2.5">
                <FileBadge className="h-5 w-5 text-[var(--accent)]" />
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--accent)] uppercase">
                  {certificate.documentType || 'Certificate Preview'}
                </span>
                {hasMultiple && (
                  <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--muted)]">
                    {currentIndex + 1} / {certificates.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous certificate"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next certificate"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scanned Image/PDF if attached, otherwise Framed Resume-Backed Digital Certificate */}
            <div className="mt-6">
              {showRealAsset ? (
                isPdf ? (
                  <div className="space-y-3">
                    <iframe
                      src={assetPath}
                      title={`${certificate.title} PDF`}
                      className="h-[460px] w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)]"
                    />
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={assetPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                      >
                        <span>Open Certificate PDF in New Tab</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      {certificate.verifyUrl && (
                        <a
                          href={certificate.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          <span>Official Verification Link</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] p-2">
                      <img
                        src={assetPath}
                        alt={`${certificate.title} original certificate`}
                        onError={() => setImgError(true)}
                        className="max-h-[520px] w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={assetPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                      >
                        <span>Open Full Image in New Tab</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      {certificate.certificatePdf && (
                        <a
                          href={certificate.certificatePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          <span>View Official PDF</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {certificate.verifyUrl && (
                        <a
                          href={certificate.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          <span>Official Verification Link</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div
                  style={{
                    background:
                      'linear-gradient(145deg, var(--bg-card) 0%, var(--bg-card-alt) 52%, var(--bg-chip) 100%)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  className="relative overflow-hidden rounded-[22px] border-2 border-[var(--border-strong)] p-3 sm:p-4"
                >
                  {/* Subtle Watermark & Dot Pattern */}
                  <div className="dot-grid pointer-events-none absolute inset-0 opacity-45" />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-[8rem] italic text-[var(--accent)] opacity-[0.04] select-none sm:text-[10rem]"
                  >
                    JN
                  </div>

                  {/* Inner Ornamental Double Frame */}
                  <div className="relative z-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-5 py-6 backdrop-blur-sm sm:px-9 sm:py-8">
                    {/* Corner Flourishes */}
                    <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-[var(--accent)]/60" />
                    <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-[var(--accent)]/60" />
                    <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-[var(--accent)]/60" />
                    <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-[var(--accent)]/60" />

                    {/* Certificate Header Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] font-mono text-xs font-bold tracking-tight text-[var(--accent)]">
                          {certificate.issuerCode || 'JN'}
                        </span>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--muted)] uppercase">
                            Issuing Organization
                          </p>
                          <p className="text-xs font-semibold text-[var(--ink)] sm:text-sm">
                            {issuerName}
                          </p>
                        </div>
                      </div>

                      {scopeLabel && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{scopeLabel}</span>
                        </span>
                      )}
                    </div>

                    {/* Certificate Centerpiece */}
                    <div className="py-6 text-center sm:py-7">
                      <p className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                        {certificate.documentType || 'Certificate of Completion'}
                      </p>

                      <p className="mt-3 font-serif text-base italic text-[var(--muted)]">
                        Presented to
                      </p>

                      <p className="mt-1 font-serif text-3xl font-normal tracking-tight text-[var(--ink)] sm:text-4xl">
                        {PORTFOLIO_DATA.profile.fullName}
                      </p>

                      <div
                        aria-hidden="true"
                        className="mx-auto mt-2.5 h-px w-36 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                      />

                      <p className="mt-4 text-xs tracking-wide text-[var(--muted)] uppercase">
                        {getRecognitionPhrase(certificate)}
                      </p>

                      <h4
                        id="cert-modal-title"
                        className="mx-auto mt-2 max-w-xl font-serif text-2xl leading-snug text-[var(--accent)] sm:text-[1.75rem]"
                      >
                        {certificate.title}
                      </h4>

                      {(certificate.summary || certificate.description) && (
                        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
                          {certificate.summary || certificate.description}
                        </p>
                      )}

                      {topics.length > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] text-[var(--ink)]"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Certificate Bottom Signature & Seal Bar */}
                    <div className="grid grid-cols-1 items-center gap-4 border-t border-[var(--border-subtle)] pt-4 text-center sm:grid-cols-3 sm:text-left">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--muted)] uppercase">
                          Track &amp; Category
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-[var(--ink)]">
                          {certificate.category}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg-chip)] text-[var(--accent)] shadow-sm">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="mt-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
                          Resume Verified
                        </span>
                      </div>

                      <div className="sm:text-right">
                        <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--muted)] uppercase">
                          Credential Holder
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-[var(--ink)]">
                          Janvi Nankani · BCA, LJCCA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-chip)] px-4 py-2 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open Official Resume (PDF)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
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
