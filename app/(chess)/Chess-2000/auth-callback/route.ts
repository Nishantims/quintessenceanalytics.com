import { createClient } from '@/lib/chess/supabase-server'
import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

// Handles Supabase's email-confirmation redirect for Chess-2000 signups —
// same real exchangeCodeForSession (PKCE) pattern as the rest of the
// site's own app/(auth)/callback/route.ts, redirecting back to the
// subscribe page instead of /dashboard once confirmed.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) redirect('/Chess-2000/subscribe?error=missing_code')

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) redirect('/Chess-2000/subscribe?error=confirmation_failed')

  redirect('/Chess-2000/subscribe')
}
