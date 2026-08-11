'use client'

import { createBrowserClient } from '@supabase/ssr'

// Browser-side Supabase client for Chess-2000 — Client Components only.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
