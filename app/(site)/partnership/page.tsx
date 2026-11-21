import type { Metadata } from "next";
import Link from "next/link";
import { SidePhoto } from "@/components/SidePhoto";

// The business-development partnership plan (owner, 2026-11-21, from "Strategic_Business_Partnership_Plan.pdf"):
// Market-Reports.com, Quintessence Analytics and PropertyJaanch, Middle East & Africa plus Hyderabad, 50:50 on
// project profit. Shared by link only: not in the menu or the sitemap, and noindex. The PDF's review of a named
// individual's director record is deliberately left out - due diligence on a person is not published on a web page.
export const metadata: Metadata = {
  title: "Partnership Plan — Quintessence Analytics",
  description:
    "A 90-day business development partnership across Market-Reports.com, Quintessence Analytics and PropertyJaanch: who does what, how profit is shared 50:50, and the rules that protect both partners.",
  robots: { index: false, follow: false },
};

const A = { pink: "var(--pink)", blue: "var(--blue)", green: "var(--green)" } as const;
type Accent = keyof typeof A;

const OFFERS: { name: string; tag: string; accent: Accent; body: string; points: string[]; price: string }[] = [
  {
    name: "Market-Reports.com",
    tag: "Research & decision intelligence",
    accent: "blue",
    body: "A catalogue of 4,600+ markets: syndicated reports, Executive Strategic & Intelligence Reports, snapshots, Excel datapacks, dashboards, Viewpoint briefs and custom research.",
    points: [
      "Lead with the client's decision - market entry, investment screening, competitor positioning, product launch, country priorities",
      "First step is easy: a free report preview, or a paid Viewpoint or snapshot",
      "Expand into a full report, a datapack or a custom engagement",
    ],
    price: "Pulse $30 · Viewpoint $250 · Snapshot $500 · Datapack $3,000 · Report $4,750 · Executive Report $6,000",
  },
  {
    name: "Quintessence Analytics",
    tag: "Enterprise AI solutions & assurance",
    accent: "pink",
    body: "Six service lines: AI agent development & automation, agent quality & evaluation, AI governance & risk, workflow automation, data & knowledge systems, and decision systems.",
    points: [
      "Sell one scoped business outcome, never generic 'AI transformation'",
      "Best first offers: workflow discovery, a one-process pilot, an independent agent evaluation, a knowledge assistant, a governance inventory",
      "Paid discovery or a fixed-scope pilot before any enterprise build",
    ],
    price: "Pilots from US$1,000 · enterprise work scoped to a fixed price",
  },
  {
    name: "PropertyJaanch",
    tag: "Hyderabad property trust & transactions",
    accent: "green",
    body: "Property Trust Check (ownership, title, encumbrance, loans, disputes, boundaries, documents), a verified marketplace and a secure transaction workflow. Launch stage: the scoring engine is in development.",
    points: [
      "Start with referrals and coordination of defined property checks",
      "Legal opinions from advocates, surveys from licensed surveyors, valuations from qualified valuers, escrow only through a regulated provider",
      "Report exactly what was checked, by whom and when - and what remains unverified",
    ],
    price: "Fees confirmed per check before any campaign",
  },
];

const ROLES: { area: string; bd: string; ops: string }[] = [
  { area: "Market selection", bd: "Local insight, contacts, competitor intelligence", ops: "Validates demand, positioning and offer economics" },
  { area: "Marketing", bd: "Prospecting, events, introductions, sharing content", ops: "Product messaging, previews, case notes, technical content" },
  { area: "Sales", bd: "Owns the relationship, coordinates discovery, follows up, negotiates within agreed limits", ops: "Joins technical discovery, scopes, approves pricing, writes the proposal" },
  { area: "Delivery", bd: "Client communication, expectations, feedback", ops: "Research and technical execution, staffing, quality checks, delivery and support" },
  { area: "Finance", bd: "Tracks pipeline and collections; no commitments outside agreed limits", ops: "Invoices and receivables, cost ledger, margin and payout calculation" },
  { area: "Governance", bd: "Keeps the CRM current, weekly report, discloses conflicts", ops: "Capacity planning, data security, quality and risk controls" },
];

const FUNNEL: { stage: string; exit: string; owner: "BD" | "Ops" | "Both" | "BD + Ops" }[] = [
  { stage: "Target", exit: "Account fits an agreed customer profile; named buyer identified", owner: "BD" },
  { stage: "Contacted", exit: "Personal message sent; follow-up date set", owner: "BD" },
  { stage: "Discovery", exit: "Need, decision, timing, budget route and stakeholders recorded", owner: "BD + Ops" },
  { stage: "Qualified", exit: "Capability, scope, delivery capacity and commercial fit confirmed", owner: "Ops" },
  { stage: "Proposal", exit: "Written scope, exclusions, timeline, price and payment milestones", owner: "Ops" },
  { stage: "Close", exit: "Signed order or contract, deposit or PO, vendor onboarding", owner: "Both" },
  { stage: "Delivery", exit: "Kick-off, milestones, quality checks, acceptance and handover", owner: "Ops" },
  { stage: "Expansion", exit: "Review, renewal, referral, the next offer", owner: "Both" },
];

const GETS: { who: string; accent: Accent; items: string[] }[] = [
  {
    who: "The business development partner gets",
    accent: "pink",
    items: [
      "50% of the profit on every deal they register and help win",
      "Three ready-to-sell product lines - nothing to build, no stock, no team to hire",
      "Previews, demos, proposals and delivery handled by the product side",
      "A 12-month tail on repeat orders from the clients they bring",
      "Protection from being bypassed on registered clients",
      "A monthly statement showing every invoice, cost and payout",
    ],
  },
  {
    who: "The product & operations partner gets",
    accent: "blue",
    items: [
      "50% of the profit on the same deals",
      "New markets - the Gulf, Africa and Hyderabad - without a local sales team",
      "Warm introductions and someone in the room for client meetings",
      "A disciplined pipeline: every lead with an owner and a dated next step",
      "First-hand feedback from buyers to sharpen the products",
      "Pre-existing clients, inbound sales and own IP stay their own",
    ],
  },
];

const MARKETS: { market: string; segments: string; buyers: string; route: string }[] = [
  { market: "UAE / Saudi Arabia", segments: "Consulting, industrials, energy, healthcare, technology, finance, infrastructure", buyers: "CEO and strategy, market intelligence, corporate development, innovation, CIO/CTO, risk", route: "Warm introductions, targeted account outreach, local consultants, industry events" },
  { market: "Qatar / Oman / Bahrain / Kuwait", segments: "Energy, infrastructure, healthcare, government-linked entities, financial services", buyers: "Strategy, transformation, procurement, business unit heads", route: "Partner referrals, focused account lists, sector briefings" },
  { market: "South Africa / Kenya / Nigeria / Egypt", segments: "Financial services, telecom, manufacturing, agribusiness, healthcare, energy, logistics", buyers: "Strategy, research, investment, transformation, commercial heads", route: "Country-by-country prospecting, local referrals, virtual roundtables" },
  { market: "Hyderabad", segments: "Residential and commercial buyers and sellers, NRI families, landlords, investors, developers, brokers", buyers: "Buyers and sellers, investors, channel partners, legal and valuation professionals", route: "Referral network, local search, educational sessions, broker and professional partnerships" },
];

const BUYERS: { title: string; accent: Accent; who: string; signals: string; hook: string }[] = [
  {
    title: "Market intelligence buyer",
    accent: "blue",
    who: "Companies entering a new country or segment, strategy teams in their planning cycle, investors screening sectors, manufacturers and distributors sizing demand.",
    signals: "New market announcement, product launch, acquisition, capacity expansion, tender, regulatory change, leadership hire.",
    hook: "What decision are you making in this market? We can show a preview and scope the evidence it needs.",
  },
  {
    title: "Enterprise AI buyer",
    accent: "pink",
    who: "Mid-market and enterprise organisations with document-heavy workflows, scattered knowledge, high service volumes, or AI agents already live.",
    signals: "AI hiring, an automation programme, a service backlog, a new CRM or ERP, an AI policy rollout.",
    hook: "Let us pick one workflow, measure its cost and error rate, then scope a controlled pilot with human approvals.",
  },
  {
    title: "Property buyer or referral source",
    accent: "green",
    who: "Buyers before the token payment, NRI buyers who cannot inspect documents locally, sellers who want a transparent process, brokers who want a credible verification partner.",
    signals: "Referrals from advocates, surveyors, valuers, housing societies, relocation firms and mortgage professionals.",
    hook: "Before you commit funds, know which records were checked, what was found and what needs a qualified professional.",
  },
];

const WEEKLY: { channel: string; target: string; owner: string }[] = [
  { channel: "Named-account outreach", target: "40 researched accounts, 15 personal contacts", owner: "BD" },
  { channel: "Warm introductions", target: "5 specific introduction requests", owner: "BD" },
  { channel: "LinkedIn and professional network", target: "3 useful posts, 10 relevant conversations", owner: "Both" },
  { channel: "Discovery calls", target: "3-5 calls", owner: "BD leads, Ops joins technical calls" },
  { channel: "Referral partners", target: "2 potential partners approached", owner: "BD" },
  { channel: "Proof assets", target: "1 case note, preview or demo improved", owner: "Ops" },
];

const PILOT: { days: string; actions: string; gate: string; accent: Accent }[] = [
  { days: "Days 1-15", actions: "Agree target countries and sectors; confirm product readiness, pricing, contracting entity, contracts and delivery capacity; set up the CRM and the profit policy.", gate: "Signed pilot MOU · 2 beachhead markets · 3 product one-pagers · approved price and discount sheet", accent: "pink" },
  { days: "Days 16-30", actions: "Build a 100-account list; map 2-3 buyer roles per account; write email and LinkedIn sequences; prepare previews, demos and a discovery script.", gate: "CRM populated · first 40 personal outreaches · 5-8 discovery meetings targeted", accent: "blue" },
  { days: "Days 31-60", actions: "Run discovery, qualify, demo, send scoped proposals; open 3-5 referral and channel conversations.", gate: "At least 4 qualified proposals · first paid pilot · weekly pipeline review", accent: "green" },
  { days: "Days 61-90", actions: "Deliver the first wins; collect feedback and referrals; review conversion, margin, delivery quality and each partner's contribution.", gate: "90-day review · continue, adjust or stop · revised market plan", accent: "pink" },
];

const RULES: { title: string; body: string }[] = [
  { title: "A 90-day pilot first", body: "Renewable by mutual written agreement. The pilot creates no equity, employment or authority to bind the other party." },
  { title: "Written scope", body: "The websites, products, territories, client segments and lead-registration process covered sit in an annex. Any expansion is agreed in writing." },
  { title: "Equal share, clear authority", body: "50:50 on profit does not mean identical authority: each partner runs their own workstream within agreed budgets and policies." },
  { title: "Decisions taken together", body: "Pricing exceptions, discounts above the threshold, credit, refunds, subcontracting, hiring, capital spend, new territories, public claims, data sharing, IP licensing and contract commitments." },
  { title: "Lead ownership", body: "Leads are registered in the CRM with a timestamp; both partners accept or reject within five business days; duplicates are settled on evidence; no one bypasses a registered client." },
  { title: "Confidentiality and data", body: "Client lists, pricing, research, credentials, personal data and plans are protected with access controls, and returned or deleted at the end, subject to legal retention." },
  { title: "IP stays with its owner", body: "Brands, platforms, research models, code, templates and content stay where they are. Client deliverables and licences are defined in each client contract." },
  { title: "Fair non-circumvention", body: "Limited to registered clients and live opportunities, during the term and a 12-month tail - never a restraint on either person's whole business." },
  { title: "Conflicts disclosed", body: "Competing engagements and related-party deals are disclosed; confidential information is never used for another business." },
  { title: "Simple exit", body: "Either side may end the pilot on 30 days' written notice. Active client work is completed, costs reconciled and undisputed balances paid." },
  { title: "Disputes", body: "Good-faith discussion within 15 days, then mediation, then the courts or arbitration seat set by counsel." },
  { title: "Records", body: "A monthly P&L by project, the CRM audit trail, invoices, contracts, receipts and an archive of written approvals." },
];

const CONTROLS: { title: string; body: string; accent: Accent }[] = [
  { title: "International sales", body: "Export-of-services, GST, withholding tax, foreign exchange, sanctions screening, anti-bribery, local procurement and data-transfer rules confirmed with qualified advisers for each country.", accent: "blue" },
  { title: "AI engagements", body: "Permitted data, residency, access, security testing, human review, audit logs, model limits, IP and incident response defined up front. Never a promise of zero errors.", accent: "pink" },
  { title: "Research", body: "Public fact, estimate, inference and recommendation kept apart; evidence cited; limits disclosed; no unsupported sizing presented as fact.", accent: "green" },
  { title: "Property", body: "Qualified advocates, licensed surveyors and regulated escrow providers; RERA, registration and consumer rules checked. We never hold client deposits or present PropertyJaanch as an escrow provider.", accent: "blue" },
  { title: "Marketing", body: "No invented client logos, testimonials, case studies, credentials, guarantees or local offices. A client's name or result is used only with permission.", accent: "pink" },
  { title: "Partner checks", body: "Identity, current company records, references, authority to represent any existing business, and real availability - confirmed by both sides before signing.", accent: "green" },
];

function Eyebrow({ children, accent }: { children: React.ReactNode; accent: Accent }) {
  return <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: A[accent] }}>{children}</span>;
}

function OwnerBadge({ owner }: { owner: string }) {
  const accent: Accent = owner === "BD" ? "pink" : owner === "Ops" ? "blue" : "green";
  return (
    <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: A[accent], background: `color-mix(in srgb, ${A[accent]} 14%, transparent)` }}>
      {owner}
    </span>
  );
}

export default function PartnershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow accent="pink">Partnership plan</Eyebrow>
            <h1 className="mt-4 max-w-xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
              One partner opens the doors. One partner builds and delivers.{" "}
              <span style={{ color: A.blue }}>Profit is shared</span> <span style={{ color: A.green }}>50:50.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-text-secondary">
              Market access, relationships and client acquisition on one side; products, research, technology and
              delivery on the other. Three distinct offers - market intelligence, enterprise AI and Hyderabad property
              trust - sold through one focused sales engine, without mixing their markets, risks or economics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#profit" className="rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: A.pink }}>
                How profit is shared
              </a>
              <a href="#pilot" className="rounded-full border border-border px-6 py-3 text-[14px] font-semibold text-text-primary hover:border-pink">
                The 90-day pilot
              </a>
            </div>
            <p className="mt-6 text-[13px] text-text-muted">Prepared 21 November 2026 · Discussion draft, subject to due diligence and legal review</p>
          </div>
          <SidePhoto src="/images/side/partnership.webp" alt="Two business partners shaking hands" priority />
        </div>
      </section>

      {/* At a glance */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "50:50", v: "split of distributable project profit - not gross revenue", accent: "pink" as Accent },
            { k: "90 days", v: "pilot before any joint venture, equity or directorship", accent: "blue" as Accent },
            { k: "3 offers", v: "kept separate, cross-sold only where a client truly needs it", accent: "green" as Accent },
            { k: "2 markets", v: "beachheads first, chosen from the partner's real network", accent: "pink" as Accent },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-display text-[30px] font-bold" style={{ color: A[x.accent] }}>{x.k}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">{x.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three offers */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Eyebrow accent="blue">What we sell</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
          Three businesses, <span style={{ color: A.blue }}>three distinct offers</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
          A property buyer is not a corporate AI prospect. Each offer keeps its own pipeline and its own project
          accounting; we cross-sell only where there is a genuine client need.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {OFFERS.map((o) => (
            <div key={o.name} className="flex flex-col rounded-2xl border border-border bg-surface-raised p-7">
              <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: A[o.accent] }}>{o.tag}</span>
              <h3 className="mt-2 font-display text-[21px] font-bold text-text-primary">{o.name}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-secondary">{o.body}</p>
              <ul className="mt-5 grid gap-2.5">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed text-text-primary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: A[o.accent] }} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-border pt-4 text-[13px] leading-relaxed text-text-muted">{o.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who does what */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Eyebrow accent="green">Who does what</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
            Clear roles: <span style={{ color: A.pink }}>market-facing</span> and <span style={{ color: A.blue }}>build &amp; deliver</span>
          </h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface-raised">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 font-semibold text-text-muted">Area</th>
                  <th className="p-5 font-semibold" style={{ color: A.pink }}>Business development partner (BD)</th>
                  <th className="p-5 font-semibold" style={{ color: A.blue }}>Product &amp; operations partner (Ops)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROLES.map((r) => (
                  <tr key={r.area}>
                    <td className="p-5 font-semibold text-text-primary">{r.area}</td>
                    <td className="p-5 leading-relaxed text-text-secondary">{r.bd}</td>
                    <td className="p-5 leading-relaxed text-text-secondary">{r.ops}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-14 font-display text-[22px] font-bold text-text-primary">From first contact to repeat business</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FUNNEL.map((f, i) => (
              <div key={f.stage} className="rounded-2xl border border-border bg-surface-raised p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-data text-[13px] text-text-muted">{String(i + 1).padStart(2, "0")} · {f.stage}</span>
                  <OwnerBadge owner={f.owner} />
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">{f.exit}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-text-muted">
            Service standards: a new lead acknowledged within one business day, discovery scheduled within five, a
            standard proposal within three business days of scope approval, weekly delivery updates, and missed
            milestones or scope changes raised at once. No bespoke proposal without a clear problem, a sponsor, a
            plausible budget, a decision date and a deliverable that can be completed profitably.
          </p>
        </div>
      </section>

      {/* Mutual benefit */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow accent="pink">Why it works for both</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
          Each partner gets what they <span style={{ color: A.green }}>cannot easily build alone</span>
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {GETS.map((g) => (
            <div key={g.who} className="rounded-2xl border border-border bg-surface p-8">
              <h3 className="font-display text-[20px] font-bold" style={{ color: A[g.accent] }}>{g.who}</h3>
              <ul className="mt-5 grid gap-3">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-text-primary">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: A[g.accent] }} aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-text-secondary">
          <strong className="text-text-primary">Both partners</strong> carry low risk: a 90-day pilot, exit on 30 days&apos; notice,
          no equity changing hands, and every brand, platform and piece of IP staying with its current owner.
        </p>
      </section>

      {/* Profit */}
      <section id="profit" className="scroll-mt-24 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow accent="blue">How profit is shared</Eyebrow>
              <h2 className="mt-3 max-w-xl font-display text-[30px] font-bold leading-tight text-text-primary">
                50:50 on <span style={{ color: A.blue }}>distributable project profit</span>
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
                Cash actually received from the client, excluding GST/VAT and refunds, minus approved direct project
                costs, payment, bank and FX charges, agreed third-party commissions, and project travel or other
                pre-approved expenses. Shared overhead is deducted only under a written allocation both partners approve.
              </p>
              <ul className="mt-6 grid gap-3 text-[15px] leading-relaxed text-text-primary">
                {[
                  "We split profit, never gross sales.",
                  "Neither partner's unrelated overhead or personal costs are deducted.",
                  "Instalments: profit is paid out after each collection, keeping back committed delivery costs, refunds, taxes and support.",
                  "A loss-making project is funded only as both partners agree in writing - no automatic personal liability.",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: A.blue }} aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface-raised p-7">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">Worked example (USD)</p>
              <dl className="mt-4 divide-y divide-border text-[15px]">
                {[
                  ["Client payment received, excluding tax", "10,000"],
                  ["Approved direct delivery cost", "- 2,500"],
                  ["Payment, FX and third-party costs", "- 300"],
                  ["Agreed project selling expense", "- 200"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-text-secondary">{k}</dt><dd className="font-data text-text-primary">{v}</dd></div>
                ))}
                <div className="flex justify-between gap-4 py-3"><dt className="font-semibold text-text-primary">Distributable project profit</dt><dd className="font-data font-semibold text-text-primary">7,000</dd></div>
              </dl>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-4" style={{ background: `color-mix(in srgb, ${A.pink} 14%, transparent)` }}>
                  <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: A.pink }}>BD partner</p>
                  <p className="mt-1 font-display text-[26px] font-bold text-text-primary">3,500</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: `color-mix(in srgb, ${A.blue} 14%, transparent)` }}>
                  <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: A.blue }}>Ops partner</p>
                  <p className="mt-1 font-display text-[26px] font-bold text-text-primary">3,500</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-raised p-7">
              <h3 className="font-display text-[19px] font-bold text-text-primary">Which revenue qualifies</h3>
              <ul className="mt-4 grid gap-3 text-[14.5px] leading-relaxed text-text-secondary">
                <li><strong className="text-text-primary">Qualifies:</strong> a lead registered in the CRM, accepted by both partners, developed through the partnership and contracted under an agreed product line.</li>
                <li><strong className="text-text-primary">Excluded unless both agree in writing:</strong> existing clients, opportunities already in progress, inbound website sales and business either partner sources independently.</li>
                <li><strong className="text-text-primary">Repeat orders:</strong> count for 12 months after the first paid invoice, while the partner stays involved with the account.</li>
                <li><strong className="text-text-primary">Cross-sell:</strong> needs a project record naming the originating channel, delivery entity, costs, IP owner and split.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface-raised p-7">
              <h3 className="font-display text-[19px] font-bold text-text-primary">Cash controls</h3>
              <ul className="mt-4 grid gap-3 text-[14.5px] leading-relaxed text-text-secondary">
                <li>Proposals, discounts, credit terms, refunds and commissions above an agreed threshold need written approval from both partners.</li>
                <li>Client money goes only to the contracting entity&apos;s business account, against a compliant invoice - never a personal account.</li>
                <li>A monthly project statement: invoices, cash collected, taxes, direct costs, receivables, refunds and payouts.</li>
                <li>Payout within 10 business days of month-end close and reconciliation, subject to reserves and tax advice.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Markets - photo on the left so the page alternates */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <SidePhoto src="/images/side/partnership-mea.webp" alt="Dubai's skyline at night" />
          <div>
            <Eyebrow accent="green">Where we sell</Eyebrow>
            <h2 className="mt-3 max-w-xl font-display text-[30px] font-bold leading-tight text-text-primary">
              The Middle East &amp; Africa, <span style={{ color: A.green }}>plus Hyderabad</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
              The Middle East and Africa are not one market. We pick two beachheads from the partner&apos;s real network
              and ability to attend meetings - a starting hypothesis is the UAE plus Saudi Arabia for enterprise
              accounts, and one African market with credible relationships - and confirm them through 20-30 discovery
              conversations before expanding.
            </p>
          </div>
        </div>
        <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="p-5 font-semibold">Market</th>
                <th className="p-5 font-semibold">First segments</th>
                <th className="p-5 font-semibold">Buyer roles</th>
                <th className="p-5 font-semibold">Route to market</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MARKETS.map((m) => (
                <tr key={m.market}>
                  <td className="p-5 font-semibold text-text-primary">{m.market}</td>
                  <td className="p-5 leading-relaxed text-text-secondary">{m.segments}</td>
                  <td className="p-5 leading-relaxed text-text-secondary">{m.buyers}</td>
                  <td className="p-5 leading-relaxed text-text-secondary">{m.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Buyers */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Eyebrow accent="pink">Who we sell to</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
          Three buyers, <span style={{ color: A.pink }}>three opening lines</span>
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {BUYERS.map((b) => (
            <div key={b.title} className="flex flex-col rounded-2xl border border-border bg-surface p-7">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: A[b.accent] }} aria-hidden />
              <h3 className="mt-4 font-display text-[19px] font-bold text-text-primary">{b.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{b.who}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary"><strong className="text-text-primary">Signals:</strong> {b.signals}</p>
              <p className="mt-auto pt-5 text-[14.5px] italic leading-relaxed" style={{ color: A[b.accent] }}>&ldquo;{b.hook}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pilot */}
      <section id="pilot" className="scroll-mt-24 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Eyebrow accent="blue">The 90-day pilot</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
            Prove repeatable selling first. <span style={{ color: A.blue }}>Then scale what works.</span>
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {PILOT.map((p) => (
              <div key={p.days} className="flex flex-col rounded-2xl border border-border bg-surface-raised p-6">
                <span className="font-data text-[13px] font-semibold" style={{ color: A[p.accent] }}>{p.days}</span>
                <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{p.actions}</p>
                <p className="mt-auto border-t border-border pt-4 text-[13px] leading-relaxed text-text-primary">{p.gate}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface-raised">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-border text-text-muted">
                    <th className="p-4 font-semibold">Weekly activity</th>
                    <th className="p-4 font-semibold">Target</th>
                    <th className="p-4 font-semibold">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {WEEKLY.map((w) => (
                    <tr key={w.channel}>
                      <td className="p-4 font-semibold text-text-primary">{w.channel}</td>
                      <td className="p-4 text-text-secondary">{w.target}</td>
                      <td className="p-4 text-text-secondary">{w.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-border bg-surface-raised p-7">
              <h3 className="font-display text-[19px] font-bold text-text-primary">First-quarter goals</h3>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                {[
                  ["100-120", "named accounts researched"],
                  ["30-45", "real buyer conversations"],
                  ["10-15", "discovery calls"],
                  ["4-8", "qualified proposals"],
                  ["1-3", "paid wins across the portfolio"],
                ].map(([k, v], i) => (
                  <div key={v}>
                    <dt className="font-display text-[24px] font-bold" style={{ color: [A.pink, A.blue, A.green][i % 3] }}>{k}</dt>
                    <dd className="text-[13.5px] leading-snug text-text-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[13px] leading-relaxed text-text-muted">
                One shared CRM from day one: every lead has one owner and a dated next action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Eyebrow accent="green">An illustrative month</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
          What steady state could look like - <span style={{ color: A.green }}>a scenario, not a forecast</span>
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[480px] text-left text-[14.5px]">
              <tbody className="divide-y divide-border">
                {[
                  ["2 Market Snapshots", "2 × $500", "$1,000"],
                  ["1 syndicated report", "1 × $4,750", "$4,750"],
                  ["1 Executive Report", "1 × $6,000", "$6,000"],
                  ["1 AI discovery or pilot", "1 × $5,000 (placeholder)", "$5,000"],
                ].map(([a, b, c]) => (
                  <tr key={a}><td className="p-4 text-text-primary">{a}</td><td className="p-4 text-text-secondary">{b}</td><td className="p-4 text-right font-data text-text-primary">{c}</td></tr>
                ))}
                <tr><td className="p-4 font-semibold text-text-primary">International revenue</td><td className="p-4" /><td className="p-4 text-right font-data font-semibold" style={{ color: A.green }}>$16,750</td></tr>
                <tr><td className="p-4 text-text-primary">2 Hyderabad property checks</td><td className="p-4 text-text-secondary">2 × ₹15,000 (assumed)</td><td className="p-4 text-right font-data text-text-primary">₹30,000</td></tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7 text-[14.5px] leading-relaxed text-text-secondary">
            <p>
              The Hyderabad line is shown separately in rupees and not added in until real fees, vendor costs, tax
              treatment and delivery arrangements are known. The AI pilot price is a modelling placeholder.
            </p>
            <p className="mt-3">
              After the first 90 days these assumptions are replaced with observed conversion, deal size, delivery
              capacity and collections.
            </p>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Eyebrow accent="pink">Rules that protect both partners</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
            Written down before the first deal, <span style={{ color: A.pink }}>not after</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RULES.map((r, i) => (
              <div key={r.title} className="rounded-2xl border border-border bg-surface-raised p-6">
                <span className="font-data text-[13px]" style={{ color: [A.pink, A.blue, A.green][i % 3] }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[17px] font-bold text-text-primary">{r.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{r.body}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-16 font-display text-[22px] font-bold text-text-primary">Compliance and reputation</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROLS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-surface-raised p-6">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: A[c.accent] }} aria-hidden />
                <h4 className="mt-3 font-display text-[16px] font-bold text-text-primary">{c.title}</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rhythm + agreement */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <Eyebrow accent="blue">Operating rhythm</Eyebrow>
            <ul className="mt-5 divide-y divide-border text-[14.5px]">
              {[
                ["Pipeline stand-up", "Weekly, 30 min", "BD: new leads, next actions, blockers"],
                ["Delivery and capacity", "Weekly, 30 min", "Ops: workload, milestones, risks, quality"],
                ["Commercial review", "Monthly", "Both: wins and losses, revenue, cash, margin, payouts"],
                ["Strategic review", "Quarterly", "Both: countries, sectors, offers, investment, continuation"],
              ].map(([a, b, c]) => (
                <li key={a} className="py-3">
                  <div className="flex justify-between gap-4"><span className="font-semibold text-text-primary">{a}</span><span className="text-text-muted">{b}</span></div>
                  <p className="mt-1 text-text-secondary">{c}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] leading-relaxed text-text-muted">
              Core KPIs: qualified meetings, proposal rate, win rate, average deal size, sales cycle, cash collected,
              gross margin, repeat revenue, on-time delivery and client satisfaction.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <Eyebrow accent="green">The agreement</Eyebrow>
            <p className="mt-4 text-[14.5px] leading-relaxed text-text-secondary">
              Prepared or reviewed by an Indian commercial lawyer and a chartered accountant:
            </p>
            <ol className="mt-4 grid gap-2 text-[14.5px] text-text-primary">
              {[
                "A 90-day business development and revenue-share MOU",
                "Lead registration and attribution schedule",
                "Product and territory schedule",
                "Client contract and statement-of-work templates",
                "Confidentiality, data protection and IP terms",
                "Expense and profit calculation policy",
                "Termination and active-client transition terms",
              ].map((t, i) => (
                <li key={t} className="flex gap-3"><span className="font-data text-[13px] text-text-muted">{i + 1}.</span>{t}</li>
              ))}
            </ol>
            <p className="mt-4 text-[13.5px] leading-relaxed text-text-muted">
              If the relationship later needs shared equity, employees, investment or a common brand, a separate LLP or
              company is evaluated with its tax consequences - this MOU is not a partnership in law.
            </p>
          </div>
        </div>
      </section>

      {/* First conversation */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Eyebrow accent="pink">The first conversation</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[30px] font-bold leading-tight text-text-primary">
          Eight questions we answer <span style={{ color: A.pink }}>together</span>
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            "Which two countries can the BD partner open doors in personally - and which 10 organisations and decision-makers?",
            "Which sectors do we know best, and what shows that access and credibility?",
            "How many hours a week, and can client meetings in the target time zones be covered?",
            "Are we both comfortable with a 90-day performance pilot and project-profit sharing?",
            "How will the CRM, follow-ups, reporting and client expectations be run?",
            "Which existing businesses, clients or restrictions could create conflicts?",
            "What is fair when one partner brings the lead and the other does most of the delivery - or the other way round?",
            "What is the first client problem we can solve together within 30 days?",
          ].map((q, i) => (
            <div key={q} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
              <span className="font-data text-[13px]" style={{ color: [A.pink, A.blue, A.green][i % 3] }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[14.5px] leading-relaxed text-text-primary">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <h2 className="mx-auto max-w-xl font-display text-[28px] font-bold leading-tight text-dark-text">
            Test it for 90 days, focus on a few markets, <span style={{ color: A.green }}>then scale what works</span>.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: A.pink }}
          >
            Discuss the partnership →
          </Link>
        </div>
      </section>

      <p className="mx-auto max-w-4xl px-6 pb-24 text-center text-[12.5px] leading-relaxed text-text-muted">
        A commercial planning draft, not legal, tax, property-title, escrow or investment advice. Website and public
        record information is no substitute for direct verification, references, official company records and signed
        contracts. Prices are current list prices and are confirmed, with licensing and fulfilment, before quoting.
      </p>
    </>
  );
}
