import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/chess/supabase-server'
import { getActiveSubscription } from '@/lib/chess/subscription'
import { AuthPanel } from '@/components/chess/AuthPanel'
import { CheckoutButton } from '@/components/chess/CheckoutButton'

export const metadata: Metadata = {
  title: 'Subscribe — Chess-2000',
  description: 'Your free game is used. Subscribe monthly or yearly to keep training with Chess-2000.',
}

const PLANS = [
  { id: 'monthly' as const, label: 'Monthly', price: '₹299', period: '/ month' },
  { id: 'yearly' as const, label: 'Yearly', price: '₹999', period: '/ year', note: 'Best value — under ₹84/month' },
]

export default async function SubscribePage() {
  // Wrapped for the same real reason as getActiveSubscription() itself:
  // createClient()/auth.getUser() can throw synchronously (not just
  // return an error) when the Supabase env vars aren't configured on
  // Vercel yet, and this is a dynamic Server Component that runs the
  // check on every real visit — an uncaught throw here took down the
  // whole subscribe page, not just the login state. Falls back to
  // "not logged in," the same real state this page already handles.
  let user: { email?: string } | null = null
  try {
    const supabase = await createClient()
    user = (await supabase.auth.getUser()).data.user
  } catch (err) {
    console.error('[subscribe page] auth check failed (are the Supabase env vars configured?):', err)
  }
  const activeSubscription = user ? await getActiveSubscription() : null

  return (
    <div className="min-h-screen bg-[var(--background)] text-ink">
      <div className="max-w-[720px] mx-auto px-6 py-14">
        <Link href="/Chess-2000" className="text-[12px] font-bold text-ink-faint hover:text-ink">← Back to Chess-2000</Link>

        <div className="mt-6 mb-10">
          <div className="font-heading text-2xl font-extrabold">
            {activeSubscription ? 'Your subscription is active' : 'Your free game is used'}
          </div>
          <p className="text-[13px] text-ink-faint mt-2 leading-relaxed">
            {activeSubscription
              ? `Your ${activeSubscription.plan} plan is active until ${new Date(activeSubscription.currentPeriodEnd).toLocaleDateString()}. Head back and keep training.`
              : 'One real game is free — no account needed. Every game after that needs a subscription, since real Stockfish analysis on every move has a real cost to run.'}
          </p>
        </div>

        {activeSubscription ? (
          <Link href="/Chess-2000" className="inline-block text-[13px] font-bold py-3 px-6 bg-ink text-[var(--background)]">
            ← Back to the game
          </Link>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PLANS.map(plan => (
                <div key={plan.id} className="bg-panel p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">{plan.label}</div>
                  <div className="font-heading text-3xl font-extrabold mt-1">
                    {plan.price} <span className="text-[13px] font-semibold text-ink-faint">{plan.period}</span>
                  </div>
                  {plan.note && <div className="text-[11px] text-status-green font-bold mt-1">{plan.note}</div>}
                  <div className="mt-4">
                    {user ? (
                      <CheckoutButton plan={plan.id} label={`Pay ${plan.price} — ${plan.label}`} email={user.email} />
                    ) : (
                      <div className="text-[11px] text-ink-faint text-center py-2.5 border border-dashed border-panel-line">
                        Log in or create an account below to pay
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!user && <AuthPanel />}
          </>
        )}

        <div className="mt-10 pt-6 border-t border-panel-line text-[11px] text-ink-faint leading-relaxed">
          <p className="font-bold text-ink mb-1">Payment</p>
          <p>Card, UPI (with QR code), netbanking, and wallets are all accepted via Razorpay&apos;s real checkout. This is a one-time payment for a fixed real period — it does not auto-renew.</p>
          <p className="mt-3">
            Questions or payment issues? Contact <a href="mailto:nishant@market-reports.com" className="text-accent font-semibold">nishant@market-reports.com</a>.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/Chess-2000/terms" className="text-accent font-semibold">Terms of Service</Link>
            <Link href="/Chess-2000/privacy" className="text-accent font-semibold">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
