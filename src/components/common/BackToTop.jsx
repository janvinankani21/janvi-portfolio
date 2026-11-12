import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function BackToTop() {
  const { scrollY } = useScrollProgress();
  const isVisible = scrollY > 420;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Back to top"
          data-cursor-label="TOP"
          style={{ boxShadow: 'var(--shadow-nav)' }}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-glass-strong)] text-[var(--accent)] backdrop-blur-md transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
