import { AnimatePresence, motion } from 'framer-motion';
import { Info, X } from 'lucide-react';

export default function PlaceholderToast({ notice, onClose }) {
  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ boxShadow: 'var(--shadow-nav)' }}
          className="fixed bottom-6 left-6 right-6 z-[95] mx-auto max-w-md rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-glass-strong)] p-4 text-[var(--ink)] backdrop-blur-xl sm:left-6 sm:right-auto"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-chip)] text-[var(--accent)]">
              <Info className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[var(--ink)]">{notice.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                {notice.message}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 text-[var(--muted)] transition-colors hover:bg-[var(--bg-chip)] hover:text-[var(--ink)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
