'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createChessOrder, verifyChessPayment } from '@/lib/chess/checkout-actions'

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}
interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  prefill?: { email?: string }
  theme?: { color?: string }
  handler: (response: RazorpayResponse) => void
  modal?: { ondismiss?: () => void }
}
interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}
interface RazorpayInstance { open(): void }

function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window !== 'undefined' && window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Real Razorpay Checkout widget — natively supports card, UPI (including
// its own QR code), netbanking/bank transfer, and wallets without any
// extra integration work; Razorpay decides which methods to show based on
// the live account's own enabled methods.
export function CheckoutButton({ plan, label, email }: { plan: 'monthly' | 'yearly'; label: string; email?: string }) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'creating' | 'paying' | 'verifying'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setError(null)
    setState('creating')

    const order = await createChessOrder(plan)
    if ('error' in order) {
      setError(
        order.error === 'unauthenticated'
          ? 'Please log in first.'
          : `Could not start checkout: ${order.error}`
      )
      setState('idle')
      return
    }

    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setError('Could not load the payment gateway — check your connection.')
      setState('idle')
      return
    }

    setState('paying')
    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'Chess-2000',
      description: label,
      theme: { color: '#2563eb' },
      prefill: email ? { email } : undefined,
      handler: async (response: RazorpayResponse) => {
        setState('verifying')
        const verify = await verifyChessPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          plan,
        )
        if (!verify.success) {
          setError(`Payment verification failed — contact nishant@market-reports.com with payment ID: ${response.razorpay_payment_id}`)
          setState('idle')
          return
        }
        router.push('/Chess-2000/play')
        router.refresh()
      },
      modal: { ondismiss: () => setState('idle') },
    })
    rzp.open()
  }

  const isLoading = state !== 'idle'
  const buttonLabel =
    state === 'creating' ? 'Creating order…' :
    state === 'paying' ? 'Waiting for payment…' :
    state === 'verifying' ? 'Verifying payment…' :
    label

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full text-[13px] font-bold py-3 bg-ink text-[var(--background)] disabled:opacity-60"
      >
        {buttonLabel}
      </button>
      {error && <p className="text-[11px] text-status-red mt-2 text-center">{error}</p>}
    </div>
  )
}
