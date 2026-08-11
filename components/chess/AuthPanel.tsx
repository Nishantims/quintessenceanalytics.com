'use client'

import { useActionState, useState } from 'react'
import { chessLogin, chessSignup, type AuthActionState } from '@/lib/chess/auth-actions'

// Combined login/signup panel for the Chess-2000 paywall — one real
// account (Supabase Auth, the same project the rest of the site uses)
// works for both logging back in and completing a fresh purchase.
export function AuthPanel() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [loginState, loginAction, loginPending] = useActionState<AuthActionState, FormData>(chessLogin, undefined)
  const [signupState, signupAction, signupPending] = useActionState<AuthActionState, FormData>(chessSignup, undefined)

  const state = mode === 'login' ? loginState : signupState
  const action = mode === 'login' ? loginAction : signupAction
  const pending = mode === 'login' ? loginPending : signupPending

  return (
    <div className="bg-panel p-4">
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        <button
          onClick={() => setMode('signup')}
          className={`text-[11px] font-bold py-2 ${mode === 'signup' ? 'bg-ink text-[var(--background)]' : 'bg-panel-line text-ink-faint'}`}
        >
          Create account
        </button>
        <button
          onClick={() => setMode('login')}
          className={`text-[11px] font-bold py-2 ${mode === 'login' ? 'bg-ink text-[var(--background)]' : 'bg-panel-line text-ink-faint'}`}
        >
          Log in
        </button>
      </div>

      <form action={action} className="space-y-3">
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wide text-ink-faint mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full text-[12px] bg-[var(--background)] border border-panel-line px-3 py-2 text-ink"
          />
        </div>
        <div>
          <label className="block text-[9.5px] font-bold uppercase tracking-wide text-ink-faint mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            className="w-full text-[12px] bg-[var(--background)] border border-panel-line px-3 py-2 text-ink"
          />
          {mode === 'signup' && <p className="text-[10px] text-ink-faint mt-1">At least 8 characters.</p>}
        </div>
        {state?.error && <p className="text-[11px] text-status-red">{state.error}</p>}
        {state?.success && <p className="text-[11px] text-status-green leading-relaxed">{state.success}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full text-[12px] font-bold py-2.5 bg-accent text-white disabled:opacity-60"
        >
          {pending ? (mode === 'login' ? 'Logging in…' : 'Creating account…') : (mode === 'login' ? 'Log in' : 'Create account')}
        </button>
      </form>
    </div>
  )
}
