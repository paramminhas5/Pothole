import Link from 'next/link';

export default function DevelopersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">Build With Us</h1>
        <p className="text-[var(--color-text-muted)] text-lg">Sahayata is open-source civic infrastructure. We need developers, designers, translators, and security researchers. Here is everything you need to start contributing today.</p>
      </div>

      {/* WHY */}
      <section className="brutal-card mb-8 !border-[var(--color-accent)]">
        <h2 className="heading-2 mb-4">Why This Exists</h2>
        <p className="text-sm mb-3">India has 600M+ people under 30. They face paper leaks, unemployment, bulldozer demolitions, internet shutdowns, and police violence — with no institutional tool to fight back besides the courts (slow) and social media (loud but powerless).</p>
        <p className="text-sm mb-3"><strong>Sahayata fills the gap:</strong> a tool that turns street anger into legal, institutional, sustained pressure. RTI → FIR → PIL → Representative → Election. Every tool on this platform leads to a concrete institutional action, not a petition or a like.</p>
        <p className="text-sm font-bold">We are not a startup. We are not a political party. We are infrastructure. Like roads — anyone can use them, nobody owns them.</p>
      </section>

      {/* TECH STACK */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Framework:</strong> <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Next.js 16</a> (App Router, Server Components)
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>UI:</strong> <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">React 19</a> + <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Tailwind CSS 4</a>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Language:</strong> <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">TypeScript 5</a> (strict mode)
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Database:</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Supabase</a> (PostgreSQL + Auth + Realtime)
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Testing:</strong> <a href="https://vitest.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Vitest</a> (unit) + Playwright (E2E planned)
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>Deployment:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Vercel</a> + Cloudflare Pages + Self-hosted mirrors
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-4">License: <strong>AGPL-3.0</strong> — use it, fork it, improve it, but share your improvements with the community.</p>
      </section>

      {/* HOW TO SET UP */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">Set Up in 5 Minutes</h2>
        <div className="font-mono text-sm bg-[var(--color-surface-alt)] p-4 rounded overflow-x-auto space-y-2">
          <p className="text-[var(--color-text-muted)]"># Clone the repo</p>
          <p>git clone https://github.com/paramminhas5/Pothole.git</p>
          <p>cd Pothole</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Install dependencies</p>
          <p>npm install</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Copy environment config</p>
          <p>cp .env.local.example .env.local</p>
          <p className="text-[var(--color-text-muted)]"># Edit .env.local with your Supabase keys (free tier works)</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Run development server</p>
          <p>npm run dev</p>
          <p>&nbsp;</p>
          <p className="text-[var(--color-text-muted)]"># Check everything passes</p>
          <p>npm run check  <span className="text-[var(--color-text-muted)]"># lint + typecheck + test + build</span></p>
        </div>
      </section>

      {/* WHAT NEEDS BUILDING */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">What Needs Building (Priority Order)</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-red-50 dark:bg-red-950 rounded border border-red-200 dark:border-red-800">
            <strong className="text-red-800 dark:text-red-200">P0 — Security (before public launch):</strong>
            <ul className="mt-1 space-y-1 ml-4 list-disc">
              <li>Supabase RLS policies rewrite (prevent session_id leaks)</li>
              <li>Replace shared admin secret with role-based auth + MFA</li>
              <li>OTP flow fix (store code hashes, consume once, expire)</li>
              <li>Data retention jobs (actually delete expired posts, not just filter)</li>
            </ul>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded border border-yellow-200 dark:border-yellow-800">
            <strong className="text-yellow-800 dark:text-yellow-200">P1 — Core features:</strong>
            <ul className="mt-1 space-y-1 ml-4 list-disc">
              <li>Real MapLibre map integration (replace CSS dots with actual tiles)</li>
              <li>WebPush notifications + Twilio SMS for 2G alerts</li>
              <li>i18n extraction (move strings from components to message files)</li>
              <li>Search across all resources, demands, groups</li>
              <li>Community translation interface (anyone can translate a page)</li>
              <li>RTI auto-escalation (30-day timer → remind → generate appeal)</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
            <strong className="text-blue-800 dark:text-blue-200">P2 — Growth:</strong>
            <ul className="mt-1 space-y-1 ml-4 list-disc">
              <li>Tor hidden service (.onion mirror)</li>
              <li>IPFS static export (censorship-resistant archive)</li>
              <li>Client-side encrypted evidence vault</li>
              <li>Regional language support (Tamil, Bengali, Marathi, Telugu, Kannada)</li>
              <li>SMS/IVR interface for feature phones</li>
              <li>Accessibility audit + WCAG 2.2 AA compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTRIBUTION WORKFLOW */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">Contribution Workflow</h2>
        <ol className="steps-list">
          <li><strong>Pick an issue</strong><span>Check <a href="https://github.com/paramminhas5/Pothole/issues" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">GitHub Issues</a> or the priority list above. Comment &quot;I&apos;ll take this&quot; to claim.</span></li>
          <li><strong>Fork &amp; branch</strong><span>Fork the repo. Create a branch: <code>feat/your-feature</code> or <code>fix/your-fix</code>.</span></li>
          <li><strong>Build &amp; test</strong><span>Run <code>npm run check</code> before pushing. Zero TypeScript errors. All bilingual (EN + HI).</span></li>
          <li><strong>Pull Request</strong><span>Open a PR with: what it does, what was tested, any known limitations. We review within 48 hours.</span></li>
          <li><strong>Ship</strong><span>Merged PRs deploy automatically. Your code is now protecting people.</span></li>
        </ol>
      </section>

      {/* CODE STANDARDS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">Code Standards</h2>
        <div className="space-y-2 text-sm">
          <p><strong>TypeScript:</strong> Strict mode. No <code>any</code>. Explicit return types on exports.</p>
          <p><strong>Bilingual:</strong> Every user-facing string must have EN + HI. Use the <code>hi</code> variable pattern.</p>
          <p><strong>Accessible:</strong> Semantic HTML. ARIA labels. Keyboard navigable. 48px touch targets.</p>
          <p><strong>Offline-first:</strong> Core guides must work without internet. Use service worker cache.</p>
          <p><strong>Security rules:</strong></p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Never expose session_id, tokens, or secrets in public API responses</li>
            <li>Never use <code>.select(&apos;*&apos;)</code> — always explicit field lists</li>
            <li>Never trust client input — validate on server with <code>src/lib/validation.ts</code></li>
            <li>Never present unverified data as verified — use trust tiers</li>
            <li>Never store raw secrets — hash everything (OTP codes, invite tokens)</li>
          </ul>
          <p><strong>Performance:</strong> &lt;100KB initial JS. Lazy-load maps/charts. Server-render all static content.</p>
        </div>
      </section>

      {/* ROLES NEEDED */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">Roles We Need</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Frontend (React/Next.js)</strong> — New pages, components, i18n, accessibility</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Backend (Node/Supabase)</strong> — API routes, RLS policies, migrations, queues</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Security</strong> — Pen testing, RLS audit, threat modeling, secure auth flows</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>DevOps</strong> — CI/CD, mirror deployment, Tor/IPFS setup, monitoring</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Design</strong> — UI/UX, component design, print layouts, poster templates</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Translation</strong> — Hindi review, Tamil, Bengali, Marathi, Telugu, Kannada</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Legal</strong> — Rights content review, RTI template accuracy, PIL formats</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Content</strong> — Movement documentation, case studies, guide writing</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="brutal-card mb-8 !border-[var(--color-accent)]">
        <h2 className="heading-2 mb-4">Get Started Now</h2>
        <div className="space-y-3 text-sm">
          <p><strong>GitHub:</strong> <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline font-bold">github.com/paramminhas5/Pothole</a></p>
          <p><strong>Issues:</strong> <a href="https://github.com/paramminhas5/Pothole/issues" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Open issues — pick one and start</a></p>
          <p><strong>License:</strong> AGPL-3.0 — free forever, improvements shared</p>
          <p className="font-bold mt-4">Every line of code you write is protecting someone&apos;s rights. Start today.</p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">GitHub Repo →</a>
        <Link href="/infrastructure" className="brutal-btn brutal-btn-lg text-center">Infrastructure Guide →</Link>
      </div>
    </div>
  );
}
