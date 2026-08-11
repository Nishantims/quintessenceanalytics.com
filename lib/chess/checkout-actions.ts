'use server'

import { createClient } from './supabase-server'
import { getSupabaseAdmin } from './supabase-admin'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Real prices, in INR — Razorpay Orders API wants the amount in the
// smallest currency unit (paise), so *100.
const PLAN_PRICE_INR: Record<'monthly' | 'yearly', number> = {
  monthly: 299,
  yearly: 999,
}
const PLAN_PERIOD_DAYS: Record<'monthly' | 'yearly', number> = {
  monthly: 30,
  yearly: 365,
}

function getRazorpay(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.')
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

export type CreateOrderResult =
  | { orderId: string; amount: number; currency: string; keyId: string; error?: never }
  | { error: string; orderId?: never }

// Creates a real Razorpay Order for the chosen plan — the actual payment
// still has to be completed and verified (below) before any access is
// granted; creating an order alone charges nothing.
export async function createChessOrder(plan: 'monthly' | 'yearly'): Promise<CreateOrderResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'unauthenticated' }

  const amount = PLAN_PRICE_INR[plan] * 100
  const currency = process.env.RAZORPAY_CURRENCY ?? 'INR'

  let order: { id: string }
  try {
    const rzp = getRazorpay()
    order = await rzp.orders.create({
      amount,
      currency,
      receipt: `chess2000-${plan}-${user.id.slice(0, 8)}`,
      notes: { user_id: user.id, plan },
    }) as { id: string }
  } catch (e: unknown) {
    const message = (() => {
      if (!e || typeof e !== 'object') return String(e)
      const err = e as Record<string, unknown>
      if (err.error && typeof err.error === 'object') {
        const inner = err.error as Record<string, unknown>
        return String(inner.description ?? inner.code ?? JSON.stringify(inner))
      }
      return String(err.message ?? JSON.stringify(err))
    })()
    console.error('[chess checkout] order creation failed:', message)
    return { error: message }
  }

  return { orderId: order.id, amount, currency, keyId: process.env.RAZORPAY_KEY_ID ?? '' }
}

export type VerifyResult = { success: true; plan: 'monthly' | 'yearly'; currentPeriodEnd: string } | { success: false; error: string }

// Verifies the real HMAC-SHA256 signature Razorpay's checkout widget hands
// back (order_id|payment_id, signed with the real key secret) before
// granting anything — the same real, standard check the rest of the
// site's own Razorpay integration already uses. Never trusts the client's
// say-so that a payment succeeded.
export async function verifyChessPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  plan: 'monthly' | 'yearly',
): Promise<VerifyResult> {
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? ''
  const expected = crypto.createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex')
  if (expected !== razorpay_signature) return { success: false, error: 'signature_mismatch' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'unauthenticated' }

  const currentPeriodEnd = new Date(Date.now() + PLAN_PERIOD_DAYS[plan] * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await getSupabaseAdmin().from('chess_subscriptions').insert({
    user_id: user.id,
    plan,
    status: 'active',
    razorpay_order_id,
    razorpay_payment_id,
    amount_paid_inr: PLAN_PRICE_INR[plan],
    current_period_end: currentPeriodEnd,
  })
  if (error) {
    console.error('[chess checkout] failed to record subscription:', error)
    return { success: false, error: 'record_failed' }
  }

  return { success: true, plan, currentPeriodEnd }
}
