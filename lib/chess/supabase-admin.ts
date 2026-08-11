import 'server-only'

import { createClient } from '@supabase/supabase-js'

// Service-role Supabase client for Chess-2000. BYPASSES Row Level
// Security — use ONLY for the Razorpay checkout verification Server
// Action and the Razorpay webhook handler, which both need to write
// chess_subscriptions rows on behalf of the paying user. NEVER import
// this in a Client Component.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
