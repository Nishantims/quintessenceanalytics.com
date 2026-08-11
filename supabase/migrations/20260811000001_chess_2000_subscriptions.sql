-- Chess-2000 subscriptions — real, namespaced tables (chess_ prefix) added
-- to the shared Supabase project, alongside market-reports-web's own
-- schema. Auth itself reuses Supabase's built-in auth.users — no separate
-- Chess-2000 user table is needed.
--
-- Model: a real one-time payment grants a real time-boxed pass (30 real
-- days for monthly, 365 real days for yearly), checked against
-- current_period_end on each game start — not an auto-recurring Razorpay
-- Subscription. This deliberately reuses the exact order-create +
-- signature-verify pattern already proven in
-- lib/actions/razorpay-checkout.ts rather than standing up Razorpay's
-- separate (and materially riskier to get right blind) recurring-billing
-- product. A real renewal still requires the user to pay again — there is
-- no silent auto-charge.

create table if not exists chess_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('monthly', 'yearly')),
  status text not null default 'active' check (status in ('active', 'expired')),
  razorpay_order_id text not null,
  razorpay_payment_id text not null,
  amount_paid_inr integer not null,
  current_period_end timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists chess_subscriptions_user_id_idx on chess_subscriptions(user_id);
create unique index if not exists chess_subscriptions_razorpay_payment_id_idx on chess_subscriptions(razorpay_payment_id);

alter table chess_subscriptions enable row level security;

-- Users can see their own subscription rows (for the "your plan is active
-- until X" display) — all writes go through the service-role client in
-- the checkout Server Action / webhook, never directly from the browser.
create policy "chess_subscriptions_select_own" on chess_subscriptions
  for select using (auth.uid() = user_id);

-- One real free game per browser, tracked by a signed httpOnly cookie set
-- from the server (see lib/chess/free-game.ts) — not stored in this table,
-- since it applies before a user account even exists.
