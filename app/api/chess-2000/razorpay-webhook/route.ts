import 'server-only'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/chess/supabase-admin'

export const runtime = 'nodejs'

const PLAN_PERIOD_DAYS: Record<'monthly' | 'yearly', number> = {
  monthly: 30,
  yearly: 365,
}
const PLAN_PRICE_INR: Record<'monthly' | 'yearly', number> = {
  monthly: 299,
  yearly: 999,
}

// Real safety net alongside the client-triggered verifyChessPayment —
// covers the case where a real payment succeeds but the browser tab
// closes (or the network drops) before the client ever calls back to
// record it. Same real HMAC-SHA256 webhook-secret verification and
// webhook_events idempotency-table pattern already proven in
// app/api/webhooks/razorpay/route.ts, reused against the shared Supabase
// project (event ids prefixed chess2000_ so they can't collide with the
// rest of the site's own webhook events in that same table).
export async function POST(req: Request) {
  const rawBody = await req.text()
  const sig = req.headers.get('x-razorpay-signature')
  if (!sig) return new Response('Missing signature', { status: 400 })

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return new Response('Webhook secret not configured', { status: 500 })

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  if (expected !== sig) return new Response('Signature mismatch', { status: 400 })

  const event = JSON.parse(rawBody) as {
    event: string
    payload: {
      payment?: {
        entity: {
          id: string
          order_id: string
          notes?: { user_id?: string; plan?: string }
        }
      }
    }
  }

  const payment = event.payload.payment?.entity
  if (event.event !== 'payment.captured' || !payment) {
    return new Response('Ignored', { status: 200 })
  }

  const eventId = `chess2000_${payment.id}`
  const { error: idempErr } = await supabaseAdmin
    .from('webhook_events')
    .insert({ id: eventId, event_type: event.event })
  if (idempErr) {
    if (idempErr.code === '23505') return new Response('Already processed', { status: 200 })
    console.error('[chess webhook] idempotency insert failed:', idempErr)
    return new Response('Internal error', { status: 500 })
  }

  const userId = payment.notes?.user_id
  const plan = payment.notes?.plan as 'monthly' | 'yearly' | undefined
  if (!userId || !plan || !(plan in PLAN_PERIOD_DAYS)) {
    console.error('[chess webhook] payment.captured missing real user_id/plan notes:', payment.id)
    return new Response('OK', { status: 200 })
  }

  // The client-triggered verifyChessPayment (lib/chess/checkout-actions.ts)
  // usually inserts this row first — the unique index on
  // razorpay_payment_id makes this a real no-op if it already did.
  const { error } = await supabaseAdmin.from('chess_subscriptions').insert({
    user_id: userId,
    plan,
    status: 'active',
    razorpay_order_id: payment.order_id,
    razorpay_payment_id: payment.id,
    amount_paid_inr: PLAN_PRICE_INR[plan],
    current_period_end: new Date(Date.now() + PLAN_PERIOD_DAYS[plan] * 24 * 60 * 60 * 1000).toISOString(),
  })
  if (error && error.code !== '23505') {
    console.error('[chess webhook] failed to record subscription:', error)
    return new Response('Internal error', { status: 500 })
  }

  return new Response('OK', { status: 200 })
}
