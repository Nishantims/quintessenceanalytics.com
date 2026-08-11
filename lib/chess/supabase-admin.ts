import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Service-role Supabase client for Chess-2000. BYPASSES Row Level
// Security — use ONLY for the Razorpay checkout verification Server
// Action and the Razorpay webhook handler, which both need to write
// chess_subscriptions rows on behalf of the paying user. NEVER import
// this in a Client Component.
//
// Lazy on purpose — a real, confirmed production incident otherwise:
// Next.js evaluates every route module (including this webhook route's
// imports) while collecting page data at BUILD time, not just at
// request time. A plain top-level createClient() call throws
// immediately if the env vars aren't set yet on Vercel, which failed
// the ENTIRE site's build — every other route along with it — over one
// unconfigured payments feature. Deferring creation to first real use
// means a missing env var only breaks the webhook/checkout requests
// that actually need it, not the whole deploy.
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
