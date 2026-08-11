import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-side Supabase client for Chess-2000 — Server Components, Server
// Actions, and Route Handlers only. Same real pattern already proven in
// lib/supabase/server.ts for the rest of the site (reusing the same
// Supabase project, not a separate one), just without the generated
// `Database` type (Chess-2000's own tables aren't in that generated file).
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component where cookies are read-only —
            // safe to ignore, same as the rest of the site's own client.
          }
        },
      },
    }
  )
}
