'use server'

import { createClient } from './supabase-server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Same real pattern as lib/auth/actions.ts (the rest of the site's own
// working login/signup) — reused deliberately rather than re-invented,
// against the SAME shared Supabase project, so an existing
// market-reports.com account works here too.

export type AuthActionState = { error?: string; success?: string } | undefined

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
})

const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function chessLogin(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = LoginSchema.safeParse({ email, password })
  if (!parsed.success) return { error: 'Email and password are required' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.code === 'invalid_credentials') return { error: 'Invalid email or password' }
    if (error.code === 'email_not_confirmed') return { error: 'Please confirm your email before signing in — check your inbox' }
    return { error: 'Something went wrong — please try again' }
  }

  redirect('/Chess-2000/subscribe')
}

export async function chessSignup(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = SignupSchema.safeParse({ email, password })
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
    return { error: firstError }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://quintessenceanalytics.com'

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${siteUrl}/Chess-2000/auth-callback` },
  })

  if (error) return { error: 'Something went wrong — please try again' }

  // Supabase's own email-protection mode: a duplicate email returns a null
  // user with no error, same real behavior the rest of the site relies on.
  if (!data.user) return { error: 'An account with this email already exists — try logging in' }

  // If email confirmation is off for this project, signUp already returns
  // a real active session — go straight to checkout instead of asking the
  // user to check an inbox for a confirmation that was never sent.
  if (data.session) redirect('/Chess-2000/subscribe')

  return { success: `Check your inbox — we sent a confirmation email to ${email}. Confirm it, then come back here to log in and complete your purchase.` }
}
