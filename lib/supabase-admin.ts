import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Service-role Supabase client for QA.com's own tables (qa_leads). Same
// shared Supabase project as Chess-2000 (see lib/chess/supabase-admin.ts),
// but kept as its own top-level module rather than importing from lib/chess
// so QA.com's contact route doesn't depend on Chess-2000's code.
//
// Lazy singleton for the same reason lib/chess/supabase-admin.ts is: Next.js
// evaluates route modules at build time while collecting page data, and a
// top-level createClient() call throws immediately if env vars aren't set
// yet, which previously failed the entire site's build over one
// unconfigured feature. Deferring to first real use means a missing env var
// only breaks the request that actually needs it.
let client: SupabaseClient | null = null
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  }
  return client
}
