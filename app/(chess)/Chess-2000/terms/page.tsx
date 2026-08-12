/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Chess-2000',
  description: 'Subscription, billing, and usage terms for Chess-2000.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-lg font-extrabold mb-2.5">{title}</h2>
      <div className="space-y-3 text-[13.5px] leading-[1.75] text-ink-soft max-w-[680px]">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-ink">
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
          <div>
            <div className="font-heading text-2xl font-extrabold">Terms of Service</div>
            <p className="text-[12.5px] text-ink-faint mt-2">Last updated: August 2026.</p>
          </div>
          <Link href="/Chess-2000/about" className="text-[12px] font-bold bg-panel px-3 py-2 whitespace-nowrap">← Back to About</Link>
        </div>

        <Section title="The service">
          <p>Chess-2000 is a real-time chess training tool: you play a real game against a Stockfish chess engine, and the app provides real, engine-grounded analysis, move grading, and coaching feedback. One game is free; continued play requires an active subscription.</p>
        </Section>

        <Section title="Subscription and billing">
          <p>Two plans are available: Monthly (₹299) and Yearly (₹999). This is a real, <strong className="text-ink">one-time payment</strong> that grants access for a fixed real period — 30 days for the Monthly plan, 365 days for the Yearly plan — from the moment payment is confirmed. This is deliberately <strong className="text-ink">not</strong> an auto-renewing subscription: your card or UPI is never charged again automatically. When your access period ends, you'll need to subscribe again to keep playing.</p>
          <p>Payment is processed by Razorpay. By subscribing, you also agree to Razorpay's own terms for the payment method you use (card, UPI, netbanking, or wallet).</p>
        </Section>

        <Section title="Refunds">
          <p>Because access is granted immediately and in full upon payment, and because there is no recurring charge to cancel, subscriptions are generally non-refundable once the access period has started.</p>
          <p>The one real exception: if a genuine payment or technical failure means you paid but were not actually granted access, contact <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a> with your payment reference — this will be investigated and resolved directly, with a real refund if the failure is confirmed on our end.</p>
        </Section>

        <Section title="Fair use">
          <p>The engine analysis behind every move has a real compute cost, which the subscription price is set to cover under normal, real personal use. Automated or scripted use of the service (bots, scraping, or bulk analysis outside normal play) is not permitted and may result in access being suspended.</p>
        </Section>

        <Section title="Accuracy of analysis">
          <p>Every evaluation, grade, and recommendation in the app is the real, direct output of a real Stockfish engine or a real, documented formula — never invented or estimated by an AI model. That said, engine analysis reflects the engine's own real search at the depth used; it is a genuine, strong analytical tool, not a claim of perfect or infallible play. Chess-2000 does not guarantee a specific rating outcome — real improvement depends on how the feedback is actually used, over real, consistent practice.</p>
        </Section>

        <Section title="Account and access">
          <p>You're responsible for keeping your account credentials secure. Access is personal to your account and is not intended to be shared or resold.</p>
        </Section>

        <Section title="Changes">
          <p>These terms, and the real pricing above, may be updated from time to time; the current version on this page is always the one in effect.</p>
        </Section>

        <Section title="Contact">
          <p>Questions about these terms, billing, or your subscription: <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a>.</p>
        </Section>

        <div className="pt-6 border-t border-panel-line flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-ink-faint">
          <Link href="/Chess-2000" className="hover:text-ink">← Back to game</Link>
          <Link href="/Chess-2000/about" className="hover:text-ink">About</Link>
          <Link href="/Chess-2000/privacy" className="hover:text-ink">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
