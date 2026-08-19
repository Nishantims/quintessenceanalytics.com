-- Real lead persistence for quintessenceanalytics.com's contact form.
--
-- Before this, a form submission only ever became an outbound Resend email
-- (see app/api/contact/route.ts) - nothing was stored anywhere. If that
-- email send failed, or just got missed in an inbox, the enquiry was gone
-- with no record it ever happened. This table is written to in addition to
-- (not instead of) the existing email send, so a real lead always has a
-- durable record to work from when tracking "did we win this lead."
--
-- Namespaced qa_ (matching Chess-2000's chess_ prefix convention already
-- used in this shared Supabase project) since this repo hosts multiple
-- unrelated properties.

create table if not exists qa_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  interest text,
  message text not null,
  -- Mirrors the existing SOURCE_SITE string in the contact route - this
  -- route only ever serves quintessenceanalytics.com today, but the column
  -- exists so a future shared lead pipeline doesn't need a schema change.
  source text not null default 'QA.com (quintessenceanalytics.com)',
  -- Set once the email notification actually succeeds - lets a later query
  -- distinguish "we have the lead but the notification failed" (still a
  -- real lead to follow up on) from a normal successful submission.
  notified boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists qa_leads_created_at_idx on qa_leads(created_at desc);

alter table qa_leads enable row level security;

-- No public select/insert policy - every write goes through the API
-- route's service-role client, never directly from the browser. This
-- table has no end-user-facing read path today; a future internal
-- dashboard would read it with the service-role client too.
