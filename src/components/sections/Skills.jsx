import { motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Braces,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Palette,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import { GitHubIcon } from '../common/BrandIcons';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import SectionHeader from '../common/SectionHeader';

const GROUP_ICONS = {
  programming: Code2,
  frontend: Globe,
  backend: Server,
  database: Database,
  aiml: Bot,
  tools: Wrench,
  'data-design': BarChart3,
};

const SKILL_ICONS = {
  Python: Terminal,
  TypeScript: Braces,
  JavaScript: Braces,
  HTML: FileCode2,
  CSS: Palette,
  React: Code2,
  Vite: Sparkles,
  'Tailwind CSS': Palette,
  'React Query': Layers,
  'React Hook Form': FileCode2,
  Zod: Shield,
  'Node.js': Server,
  'Express.js': Cpu,
  'REST APIs': Globe,
  'JWT Authentication': KeyRound,
  'Role-Based Access Control (RBAC)': Shield,
  PostgreSQL: Database,
  SQLite: Database,
  'Prisma ORM': Layers,
  'AI and ML Fundamentals': Bot,
  'Generative AI': Sparkles,
  'Prompt Engineering': Terminal,
  BERT: Cpu,
  SHAP: BarChart3,
  Git: GitBranch,
  GitHub: GitHubIcon,
  'Cursor AI': Code2,
  'GitHub Copilot': Bot,
  'Claude Code': Terminal,
  'Model Context Protocol (MCP)': Layers,
  Tableau: BarChart3,
  Canva: Palette,
};

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-primary)] py-24 transition-colors duration-300 sm:py-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto w-[min(1200px,100%-32px)]">
        <SectionHeader
          kicker={skills.kicker}
          headingPrefix={skills.headingPrefix}
          headingHighlight={skills.headingHighlight}
          subtitle={skills.subtitle}
        />

        {/* Visual Skill Groups (No fake percentages) */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, groupIndex) => {
            const GroupIcon = GROUP_ICONS[group.id] || Code2;
            const isFullWidth = group.id === 'data-design';
            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(groupIndex * 0.05, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`editorial-card flex flex-col justify-start gap-5 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] text-[var(--accent)]">
                        <GroupIcon className="h-5 w-5" />
                      </div>
                      <h3 className="font-serif text-2xl font-normal tracking-tight text-[var(--ink)] sm:text-[1.75rem]">
                        {group.title}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--accent)]">
                      {group.items.length}
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                    {group.tagline}
                  </p>
                </div>

                <div
                  className={`grid gap-2 ${
                    isFullWidth ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {group.items.map((skill) => {
                    const SkillIcon = SKILL_ICONS[skill.name] || Code2;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.18 }}
                        className="group/chip flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3.5 py-2.5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-alt)]"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-card)] text-[var(--accent)] shadow-xs transition-colors group-hover/chip:bg-[var(--accent)] group-hover/chip:text-[var(--accent-contrast)]">
                          <SkillIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[var(--ink)]">
                            {skill.name}
                          </p>
                          <p className="truncate text-[11px] text-[var(--muted)]">
                            {skill.note}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
