import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from '../common/BrandIcons';

export default function Footer({ onPlaceholderLink }) {
  const { profile, navLinks, contact } = PORTFOLIO_DATA;

  const handleSocialClick = (e, social) => {
    if (!social.url) {
      e.preventDefault();
      onPlaceholderLink?.({
        title: `${social.label} Link Placeholder`,
        message: `Add your ${social.label} URL in src/data/portfolioData.js (${social.handle}).`,
      });
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-10 text-sm text-[var(--muted)] transition-colors duration-300">
      <div className="mx-auto flex w-[min(1200px,100%-32px)] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5 text-[var(--ink)]">
            <span className="font-serif text-xl italic text-[var(--accent)]">
              {profile.monogram}
            </span>
            <span className="font-semibold">{profile.fullName}</span>
            <span className="text-[var(--accent-soft)]">·</span>
            <span className="text-xs text-[var(--muted)]">{profile.role}</span>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>{profile.location}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Mail className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span>{contact.email}</span>
              </a>
            )}
            <a
              href={profile.socials.github.url || '#contact'}
              target={profile.socials.github.url ? '_blank' : undefined}
              rel={profile.socials.github.url ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleSocialClick(e, profile.socials.github)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>

            <a
              href={profile.socials.linkedin.url || '#contact'}
              target={profile.socials.linkedin.url ? '_blank' : undefined}
              rel={profile.socials.linkedin.url ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleSocialClick(e, profile.socials.linkedin)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>

          <span className="hidden h-3 w-[1px] bg-[var(--border-subtle)] sm:inline-block" />

          <a
            href={`#${navLinks[0].id}`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-xs font-medium tracking-wider text-[var(--accent)] uppercase transition-opacity hover:opacity-80"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
