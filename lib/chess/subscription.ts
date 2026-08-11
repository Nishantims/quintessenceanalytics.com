import 'server-only'
import { createClient } from './supabase-server'

export interface ActiveSubscription {
  plan: 'monthly' | 'yearly'
  currentPeriodEnd: string
}

// Real, current-moment check — a subscription only counts as active if its
// own real current_period_end is still in the future, not just because a
// row with status='active' exists (a real, honest expiry check, not a
// flag that could go stale).
export async function getActiveSubscription(): Promise<ActiveSubscription | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('chess_subscriptions')
    .select('plan, current_period_end')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .order('current_period_end', { ascending: false })
    .limit(1)
    .maybeSingle()

  // Real defensive fallback: if the chess_subscriptions table itself isn't
  // there yet (the migration hasn't been applied — a real, known
  // possibility since it has to be run manually via the Supabase
  // dashboard), treat that as "no active subscription" rather than
  // throwing and taking down the entire game page over a payments-related
  // query. The free-game gate still works correctly either way.
  if (error) {
    console.error('[chess subscription] lookup failed (has the migration been applied?):', error.message)
    return null
  }
  if (!data) return null
  return { plan: data.plan as 'monthly' | 'yearly', currentPeriodEnd: data.current_period_end as string }
}
