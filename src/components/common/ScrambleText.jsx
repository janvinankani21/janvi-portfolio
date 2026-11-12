import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';

export default function ScrambleText({ text, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotionPref();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reducedMotion) {
      setDisplay(text);
      return undefined;
    }

    let rafId = null;
    const duration = Math.min(420, 160 + text.length * 18);
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);
      let output = text.slice(0, revealed);

      for (let i = revealed; i < text.length; i += 1) {
        output +=
          text[i] === ' '
            ? ' '
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }

      setDisplay(output);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(frame);
      } else {
        setDisplay(text);
      }
    };

    rafId = window.requestAnimationFrame(frame);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [inView, reducedMotion, text]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
