import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Eye, Layers, Sparkles } from 'lucide-react';
import { GitHubIcon } from '../common/BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';
import ProjectArtwork from './ProjectArtwork';

export default function Projects({ onOpenProject, onPlaceholderLink }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter(
      (project) =>
        project.category === activeFilter ||
        project.filterCategories?.includes(activeFilter)
    );
  }, [activeFilter]);

  const handleLinkClick = (e, url, label, projectName) => {
    if (!url) {
      e.preventDefault();
      onPlaceholderLink?.({
        title: `${projectName} — ${label} Not Linked Yet`,
        message: `Add the verified ${label.toLowerCase()} URL in src/data/portfolioData.js when ready.`,
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative bg-[var(--bg-secondary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="mx-auto w-[min(1200px,100%-32px)]">
        {/* Header & Filter Bar */}
        <div className="flex flex-col gap-8">
          <SectionHeader
            kicker="Featured Projects"
            headingPrefix="Selected things I've"
            headingHighlight="built & led"
            subtitle="Full-stack web applications, comparison platforms, and hackathon prototypes. Visuals use placeholders until actual screenshots are uploaded."
          />

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Project category filters"
            className="flex flex-wrap gap-2 self-start rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] p-1.5"
          >
            {PORTFOLIO_DATA.projectFilters.map((filter) => {
              const selected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative rounded-xl px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                    selected
                      ? 'font-semibold text-[var(--accent-contrast)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-[var(--accent)] shadow-[0_6px_16px_rgba(118,82,200,0.28)]"
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Project Cards */}
        <motion.div layout className="mt-14 space-y-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.16, ease: 'easeOut' },
                  }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="editorial-card group grid grid-cols-1 overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-card)] lg:grid-cols-12"
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-7">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                            {project.index}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-[var(--accent-soft)]" />
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--ink)]">
                            <Layers className="h-3 w-3 text-[var(--accent)]" />
                            {project.category}
                          </span>
                          {project.highlightBadge && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-tint)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--accent)]">
                              <Sparkles className="h-3 w-3" />
                              {project.highlightBadge}
                            </span>
                          )}
                        </div>

                        <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--muted)] uppercase">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="mt-5 font-serif text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.06] font-normal tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {project.name}
                      </h3>

                      <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Technologies & Action Buttons */}
                    <div className="mt-8 space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1 font-mono text-xs font-medium text-[var(--ink)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onOpenProject(project)}
                          data-cursor-label="DETAILS"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] shadow-[0_10px_24px_-6px_rgba(118,82,200,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-label="CODE"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          >
                            <GitHubIcon className="h-4 w-4" />
                            <span>GitHub</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) =>
                              handleLinkClick(e, project.liveUrl, 'Live Demo', project.name)
                            }
                            data-cursor-label="LIVE"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Thumbnail Visual */}
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    aria-label={`Open details for ${project.name}`}
                    data-cursor-label="PREVIEW"
                    className="relative min-h-[250px] w-full overflow-hidden border-t border-[var(--border-subtle)] text-left lg:col-span-5 lg:min-h-[340px] lg:border-l lg:border-t-0"
                  >
                    <ProjectArtwork project={project} />
                  </button>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[24px] border border-dashed border-[var(--border-strong)] bg-[var(--bg-chip)] p-12 text-center"
              >
                <p className="font-serif text-2xl text-[var(--ink)]">
                  No projects match this category yet.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveFilter('All')}
                  className="mt-4 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-contrast)]"
                >
                  Show All Projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
