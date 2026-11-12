import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const links = PORTFOLIO_DATA.navLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = links[0].id;

      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            current = link.id;
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        current = links[links.length - 1].id;
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigate = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-3.5 sm:px-6">
      <nav
        aria-label="Primary Navigation"
        style={{ boxShadow: scrolled ? 'var(--shadow-nav)' : 'var(--shadow-card)' }}
        className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-2.5 py-1.5 backdrop-blur-md transition-shadow duration-300 xl:w-auto"
      >
        {/* Monogram / Brand link */}
        <a
          href="#home"
          onClick={(e) => handleNavigate(e, 'home')}
          className="group flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[var(--ink)] transition-colors hover:bg-[var(--accent-tint)]"
          aria-label="Janvi Nankani - Go to top"
        >
          <span className="font-serif text-xl italic tracking-tight text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
            {PORTFOLIO_DATA.profile.monogram}
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-[var(--accent-soft)] sm:inline-block" />
          <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted)] uppercase xl:hidden">
            {PORTFOLIO_DATA.profile.fullName}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavigate(e, link.id)}
                  className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[13px] transition-colors duration-200 ${
                    isActive
                      ? 'font-semibold text-[var(--accent-contrast)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-[0_4px_14px_rgba(118,82,200,0.32)]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right controls: Theme Toggle + Mobile/Tablet Menu */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to Light Lavender' : 'Switch to Dark Plum'}
            data-cursor-label={isDark ? 'LIGHT' : 'DARK'}
            className="flex h-10 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 text-xs font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {isDark ? (
              <span className="flex items-center gap-1.5">
                <Sun className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="hidden font-mono text-[11px] sm:inline">Light</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Moon className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="hidden font-mono text-[11px] sm:inline">Dark</span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] xl:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet navigation panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ boxShadow: 'var(--shadow-nav)' }}
            className="pointer-events-auto mt-2.5 w-full max-w-5xl overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-3 backdrop-blur-xl xl:hidden"
          >
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {links.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavigate(e, link.id)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all ${
                        isActive
                          ? 'bg-[var(--accent)] font-semibold text-[var(--accent-contrast)] shadow-[0_6px_16px_rgba(118,82,200,0.3)]'
                          : 'bg-[var(--bg-chip)] text-[var(--ink)] hover:bg-[var(--accent-tint)]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? 'bg-[var(--accent-contrast)]' : 'bg-[var(--accent-soft)]'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
