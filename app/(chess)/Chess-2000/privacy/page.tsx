/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Chess-2000',
  description: 'What Chess-2000 actually collects, why, and how it is used.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-lg font-extrabold mb-2.5">{title}</h2>
      <div className="space-y-3 text-[13.5px] leading-[1.75] text-ink-soft max-w-[680px]">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-ink">
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
          <div>
            <div className="font-heading text-2xl font-extrabold">Privacy Policy</div>
            <p className="text-[12.5px] text-ink-faint mt-2">Last updated: August 2026. This describes exactly what Chess-2000 collects and why — nothing beyond it.</p>
          </div>
          <Link href="/Chess-2000" className="text-[12px] font-bold bg-panel px-3 py-2 whitespace-nowrap">← Back to Home</Link>
        </div>

        <Section title="What we collect">
          <p><strong className="text-ink">To play your one free game:</strong> nothing that identifies you personally. A single, non-identifying browser cookie (<code className="text-[12px] bg-panel px-1">chess2000_free_game_used</code>) records only that a free game has been used on that browser — no account, no email, no name.</p>
          <p><strong className="text-ink">If you subscribe:</strong> an email address and password, used to create your account via Supabase Auth (the authentication provider this site runs on). Your password is never stored in plain text — Supabase handles that with standard, industry-normal hashing.</p>
          <p><strong className="text-ink">Payment information:</strong> when you subscribe, payment is handled directly by Razorpay's own checkout — Chess-2000's own servers never see or store your card number, UPI PIN, or full payment credentials. What we do store, tied to your account, is: the plan you chose, the amount actually paid, Razorpay's own order and payment reference IDs, and the real subscription period this grants.</p>
          <p><strong className="text-ink">While you play:</strong> the current board position (FEN) is sent to our server so a real Stockfish engine can analyze it and return an evaluation, a grade for your move, and the other real numbers the app shows you. This is processed to generate that one response and is not stored or linked to your account afterward.</p>
        </Section>

        <Section title="What we don't do">
          <p>We don't sell, rent, or share your data with third parties for marketing. We don't run analytics that fingerprint or track you across other sites. We don't store your payment card details — Razorpay does, under its own, real PCI-compliant handling.</p>
        </Section>

        <Section title="Cookies">
          <p>Besides the free-game marker above, Supabase Auth sets its own real session cookies once you're logged in, so you stay signed in between visits. Clearing your cookies signs you out and, if you haven't subscribed yet, resets your free-game marker — a known, accepted tradeoff of a no-signup free trial, not a bug.</p>
        </Section>

        <Section title="Third parties this site actually uses">
          <p><strong className="text-ink">Supabase</strong> — authentication and the subscription records described above.</p>
          <p><strong className="text-ink">Razorpay</strong> — real payment processing for subscriptions.</p>
          <p><strong className="text-ink">Vercel</strong> — hosting, including standard real server request logs (IP address, timestamp) kept for operational and security purposes, not tied to your identity beyond what's needed to keep the service running.</p>
        </Section>

        <Section title="Your data, your control">
          <p>You can cancel your subscription at any time (see <Link href="/Chess-2000/terms" className="text-accent font-semibold">Terms of Service</Link> for the real cancellation and refund policy). To request deletion of your account and associated subscription records, email <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a> — this will be handled directly and promptly, since this is a genuinely small, independent product, not a large support queue.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>If what Chess-2000 actually collects changes, this page will be updated to match — the same real-data-only standard the app itself is held to.</p>
        </Section>

        <Section title="Contact">
          <p>Questions about this policy: <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a>.</p>
        </Section>

        <div className="pt-6 border-t border-panel-line flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-faint">
          <Link href="/Chess-2000/play" className="hover:text-ink">← Back to game</Link>
          <Link href="/Chess-2000" className="hover:text-ink">Home</Link>
          <Link href="/Chess-2000/terms" className="hover:text-ink">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
