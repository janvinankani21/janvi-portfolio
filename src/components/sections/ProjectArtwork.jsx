import { useState } from 'react';
import {
  Building2,
  Compass,
  ShieldCheck,
  Smartphone,
  Sun,
  Users,
} from 'lucide-react';

export default function ProjectArtwork({ project }) {
  const [imgError, setImgError] = useState(false);

  if (project.thumbnailImage && !imgError) {
    return (
      <img
        src={project.thumbnailImage}
        alt={`${project.name} screenshot`}
        onError={() => setImgError(true)}
        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  if (project.thumbnailType === 'vendorbridge') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--bg-card-alt)] p-6 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            Visual Placeholder
          </span>
          <span className="font-mono text-[10px] text-[var(--muted)]">
            4-ROLE RBAC
          </span>
        </div>

        <div
          style={{ boxShadow: 'var(--shadow-card)' }}
          className="relative z-10 my-auto space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono text-[10px] text-[var(--muted)]">
            <span>PROCUREMENT FLOW</span>
            <span className="font-semibold text-[var(--accent)]">JWT + PRISMA</span>
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            {['Admin', 'Procurement Officer', 'Vendor', 'Manager'].map((role) => (
              <div
                key={role}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-2.5 py-1.5 text-[var(--ink)]"
              >
                {role}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-[var(--muted)]">
            <span>RFQ → Quote → PO → Invoice</span>
            <span className="text-[var(--accent)]">Audit Log</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
          <span>VendorBridge ERP</span>
          <span className="font-semibold text-[var(--accent)]">Add Screenshot</span>
        </div>
      </div>
    );
  }

  if (project.thumbnailType === 'smart-yatri') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--bg-card-alt)] p-6 transition-colors duration-300">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
            <Compass className="h-3.5 w-3.5" />
            Visual Placeholder
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--muted)]">
            <Users className="h-3 w-3 text-[var(--accent)]" />
            CROWD INSIGHTS
          </span>
        </div>

        <div
          style={{ boxShadow: 'var(--shadow-card)' }}
          className="relative z-10 my-auto space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1"
        >
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-[var(--ink)]">Visitor Density Trend</span>
            <span className="rounded-full bg-[var(--accent-tint)] px-2 py-0.5 font-semibold text-[var(--accent)]">
              Low-Crowd Window
            </span>
          </div>
          <div className="flex h-16 items-end gap-2 pt-2">
            {[35, 52, 88, 95, 64, 30, 42].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md transition-all duration-500"
                style={{
                  height: `${h}%`,
                  background: h > 75 ? 'var(--accent-soft)' : 'var(--accent)',
                  opacity: h > 75 ? 0.55 : 0.9,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[var(--muted)]">
            <span>Discovery</span>
            <span>Time Suggestions</span>
            <span>Tickets</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
          <span>LJ Innovation Village 2026</span>
          <span className="font-semibold text-[var(--accent)]">Smart Yatri</span>
        </div>
      </div>
    );
  }

  if (project.thumbnailType === 'phone-comparison') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--bg-card-alt)] p-6 transition-colors duration-300">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase">
            <Smartphone className="h-3.5 w-3.5" />
            Visual Placeholder
          </span>
          <span className="font-mono text-[10px] text-[var(--muted)]">SIDE BY SIDE</span>
        </div>

        <div className="relative z-10 my-auto grid grid-cols-2 gap-3 transition-transform duration-500 group-hover:-translate-y-1">
          <div
            style={{ boxShadow: 'var(--shadow-card)' }}
            className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-glass-strong)] p-3.5"
          >
            <span className="font-mono text-[10px] font-semibold text-[var(--accent)] uppercase">
              Device A
            </span>
            <p className="mt-1 font-serif text-lg text-[var(--ink)]">Specs</p>
            <div className="mt-3 space-y-1.5 font-mono text-[10px] text-[var(--muted)]">
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-semibold text-[var(--accent)]">Compare</span>
              </div>
              <div className="flex justify-between">
                <span>Processor</span>
                <span className="text-[var(--ink)]">Matched</span>
              </div>
            </div>
          </div>

          <div
            style={{ boxShadow: 'var(--shadow-card)' }}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-3.5"
          >
            <span className="font-mono text-[10px] text-[var(--muted)] uppercase">
              Device B
            </span>
            <p className="mt-1 font-serif text-lg text-[var(--ink)]">Evaluate</p>
            <div className="mt-3 space-y-1.5 font-mono text-[10px] text-[var(--muted)]">
              <div className="flex justify-between">
                <span>Battery</span>
                <span className="text-[var(--ink)]">Side-by-Side</span>
              </div>
              <div className="flex justify-between">
                <span>Display</span>
                <span className="font-semibold text-[var(--accent)]">Spec View</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
          <span>Smartphone Comparison</span>
          <span className="font-semibold text-[var(--accent)]">Add Screenshot</span>
        </div>
      </div>
    );
  }

  if (project.thumbnailType === 'buildsutra') {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--bg-card-alt)] p-6 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase shadow-sm">
            <Building2 className="h-3.5 w-3.5" />
            Concept Placeholder
          </span>
          <span className="font-mono text-[10px] font-medium text-[var(--muted)]">
            WORKFLOWS
          </span>
        </div>

        <div
          style={{ boxShadow: 'var(--shadow-card)' }}
          className="relative z-10 my-auto space-y-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] p-4 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1"
        >
          {['Construction Progress', 'Project Stages', 'Materials Tracking'].map(
            (stage) => (
              <div
                key={stage}
                className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-chip)] px-3 py-2 font-mono text-[11px]"
              >
                <span className="text-[var(--ink)]">{stage}</span>
                <span className="text-[var(--accent)]">Concept</span>
              </div>
            )
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
          <span>BuildSutra Concept</span>
          <span className="font-semibold text-[var(--accent)]">Add Screenshot</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--bg-card-alt)] p-6 transition-colors duration-300">
      <div
        className="pointer-events-none absolute right-6 top-6 h-36 w-36 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, var(--glow-card), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass-strong)] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[var(--accent)] uppercase shadow-sm">
          <Sun className="h-3.5 w-3.5" />
          Hackathon Prototype
        </span>
        <span className="font-mono text-[10px] font-semibold text-[var(--accent)]">
          SIH 2nd
        </span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center py-2 transition-transform duration-500 group-hover:scale-[1.03]">
        <svg viewBox="0 0 320 140" className="h-32 w-full max-w-[300px]" aria-hidden="true">
          <polygon
            points="65,24 155,24 140,56 50,56"
            fill="var(--bg-card)"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <line x1="88" y1="24" x2="73" y2="56" stroke="var(--accent-soft)" strokeWidth="1.2" />
          <line x1="120" y1="24" x2="105" y2="56" stroke="var(--accent-soft)" strokeWidth="1.2" />
          <path
            d="M110 56 L110 82 L155 82"
            fill="none"
            stroke="var(--accent)"
            strokeDasharray="4 4"
            strokeWidth="1.7"
          />
          <rect
            x="155"
            y="54"
            width="105"
            height="58"
            rx="10"
            fill="var(--bg-card)"
            stroke="var(--border-strong)"
            strokeWidth="1.6"
          />
          <path
            d="M175 76 Q190 66 205 76 T235 76"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <path
            d="M175 94 Q190 84 205 94 T235 94"
            fill="none"
            stroke="var(--accent-soft)"
            strokeWidth="1.8"
          />
          <circle cx="265" cy="28" r="11" fill="var(--accent)" fillOpacity="0.9" />
          <circle
            cx="265"
            cy="28"
            r="18"
            fill="none"
            stroke="var(--accent-soft)"
            strokeWidth="1.4"
            strokeDasharray="3 4"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
        <span>Temp · Humidity · Airflow</span>
        <span className="font-semibold text-[var(--accent)]">Concept Diagram</span>
      </div>
    </div>
  );
}
