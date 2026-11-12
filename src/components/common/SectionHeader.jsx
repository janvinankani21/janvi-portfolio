import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';

export default function SectionHeader({
  kicker,
  headingPrefix,
  headingHighlight,
  subtitle,
  align = 'left',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
        <span className="inline-block h-[1.5px] w-7 bg-[var(--accent)]" />
        <ScrambleText text={kicker} />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.98] font-normal tracking-[-0.015em] text-[var(--ink)]"
      >
        {headingPrefix}{' '}
        <em className="italic text-[var(--accent)]">{headingHighlight}</em>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
