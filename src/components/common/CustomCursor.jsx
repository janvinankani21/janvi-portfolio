import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

export default function CustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const isDesktopWidth = useMediaQuery('(min-width: 768px)');
  const reducedMotion = useReducedMotionPref();
  const enabled = isFinePointer && isDesktopWidth && !reducedMotion;

  const [visible, setVisible] = useState(false);
  const [hoverState, setHoverState] = useState({
    active: false,
    label: '',
  });
  const [pressed, setPressed] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const ringX = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return undefined;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);

      const target = e.target instanceof Element ? e.target : null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, [data-cursor]'
      );

      if (interactive) {
        const label = interactive.getAttribute('data-cursor-label') || '';
        setHoverState((prev) =>
          prev.active && prev.label === label ? prev : { active: true, label }
        );
      } else {
        setHoverState((prev) =>
          !prev.active && prev.label === '' ? prev : { active: false, label: '' }
        );
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleTouch = () => {
      document.body.classList.remove('has-custom-cursor');
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || !visible) return null;

  const hasLabel = Boolean(hoverState.label);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]" aria-hidden="true">
      {/* Trailing outer ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hasLabel ? 72 : hoverState.active ? 44 : 30,
          height: hasLabel ? 72 : hoverState.active ? 44 : 30,
          borderColor: hoverState.active
            ? 'var(--accent)'
            : 'var(--border-strong)',
          backgroundColor: hasLabel
            ? 'var(--accent)'
            : hoverState.active
              ? 'var(--accent-tint)'
              : 'transparent',
          boxShadow: hasLabel ? '0 10px 26px rgba(118, 82, 200, 0.34)' : 'none',
          scale: pressed ? 0.86 : 1,
        }}
      >
        {hasLabel && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--accent-contrast)] uppercase">
            {hoverState.label}
          </span>
        )}
      </motion.div>

      {/* Precision center dot */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[var(--accent)]"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hasLabel ? 0 : 1,
          scale: pressed ? 1.5 : 1,
          boxShadow: '0 0 10px rgba(182, 154, 232, 0.55)',
        }}
      />
    </div>
  );
}
