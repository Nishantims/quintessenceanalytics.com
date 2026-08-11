import type { Metadata } from "next";
import Link from "next/link";
import { SectionEyebrow, Band, accentAt, ACCENT_VAR } from "@/components/yum/shared";

// Full strategic brief referenced from the main /yum proposal page's "Why
// Now" teaser. Same non-indexed convention as the parent page - this is a
// bespoke document prepared for one prospect, not general site content.
export const metadata: Metadata = {
  title: "Yum! Brands Strategic Analysis & Disruptive Growth Roadmap — Quintessence Analytics",
  description:
    "A detailed strategic analysis of Yum! Brands' current position, competitive pressures, and a 30-90 day growth roadmap, prepared by Quintessence Analytics.",
  robots: { index: false, follow: false },
};

const STATS = [
  { value: "+1.0%", label: "Yum! visits, Q1 2026", sub: "vs. -3.0% for the QSR category", accent: "pink" },
  { value: "9.4%", label: "KFC U.S. market share, 2024", sub: "down from 16% in 2021", accent: "blue" },
  { value: "63%", label: "Digital order mix, Q1 2026", sub: "vs. 40-50% industry-typical", accent: "green" },
  { value: "50.8%", label: "Franchise ROIC", sub: "vs. 22.8% for McDonald's", accent: "pink" },
  { value: "35,000+", label: "Restaurants on Byte by Yum!", sub: "across 150 countries, $20B+ in digital sales", accent: "blue" },
  { value: "590M", label: "Yum China loyalty members", sub: "55% of sales, including paid tiers", accent: "green" },
];

interface Section {
  eyebrow: string;
  heading: string;
  accent: "pink" | "blue" | "green";
  body: string[];
}

const SECTIONS: Section[] = [
  {
    eyebrow: "Executive Summary",
    heading: "Outperforming the category, but under real structural pressure",
    accent: "pink",
    body: [
      `Yum! Brands outperformed the broader QSR category — restaurant visits were up 1.0% against an industry decline of 3.0% — but the business faces real structural pressure: Taco Bell's momentum is cooling, KFC has lost meaningful U.S. share to Popeyes and Raising Cane's, Pizza Hut is being divested, and management has openly acknowledged a loyalty gap.`,
      `The portfolio is now built around KFC and Taco Bell as twin growth engines, with The Habit Burger Grill positioned as an emerging third brand. The in-house Byte by Yum! AI platform is a genuine competitive advantage, but fragmented, "costly" data across more than 35,000 restaurants is limiting how fast it can scale globally.`,
      `A roughly 90-day window exists to reach 5% growth through three concrete levers: loyalty disruption, accelerating the KWENCH beverage platform, and crisis intelligence.`,
    ],
  },
  {
    eyebrow: "Brand Performance",
    heading: "KFC, Taco Bell & Pizza Hut",
    accent: "blue",
    body: [
      `KFC remains a global development machine, opening roughly 2,000 new units a year — yet its U.S. market share collapsed from 16% to 9.4% between 2021 and 2024. Its "Next Chapter" strategy centers on boneless chicken and sauces as a sustainable, repeatable sales layer rather than one-off promotions, the new KWENCH beverage line, and closing the loyalty gap.`,
      `Taco Bell delivered 8% same-store sales growth in Q1 2026 with a 47% digital order mix, but a cyclospora-linked recall is now the first real test for its new CEO.`,
      `The $2.7B Pizza Hut divestiture removes a structural drag — its operating profit had been declining 14% — freeing capital to concentrate on the two growth engines. Across all three brands, Byte by Yum! AI deployment is accelerating, but integrating data globally remains the key unresolved challenge.`,
    ],
  },
  {
    eyebrow: "Competitive Landscape",
    heading: "Global position & category share",
    accent: "green",
    body: [
      `In Q2 2026, Yum!'s visits were down just 0.5% against a 3.0% decline across the broader QSR category. Digital mix reached 63% in Q1, well ahead of the industry's typical 40-50% range.`,
      `Yum China's loyalty program has 590 million members generating 55% of sales — including paid membership tiers — and represents a largely untapped blueprint for the U.S. market.`,
      `In the U.S., KFC has lost share to Chick-fil-A (the undisputed category leader), Popeyes (sandwich innovation), and Raising Cane's (its tender-only focus), while McDonald's continues expanding with 8,000+ new locations globally. India is a notable exception: KFC's 600+ stores outnumber McDonald's 500+, a structural advantage built on a unified franchise partnership with Devyani International.`,
    ],
  },
  {
    eyebrow: "Consumer & Category Trends",
    heading: "What's actually shifting demand",
    accent: "pink",
    body: [
      `Price sensitivity is rising as lower-income consumers trade down, making value positioning — like KFC's $5 Tender Tuesday — an essential loyalty lever. Personalization is no longer optional: consumers expect relevant offers and seamless digital engagement.`,
      `"Sauce culture" is a genuine engagement driver, reflected in KFC's 20+ sauce lineup and its "Dunked" menu line. Beverage innovation — KWENCH's boba and sparkling lemonades — is driving check growth.`,
      `U.S. consumers increasingly expect paid premium loyalty tiers with exclusive benefits and delivery priority; Yum China's 590-million-member program proves this model works at scale.`,
    ],
  },
  {
    eyebrow: "Franchise Economics",
    heading: "Capital efficiency as the growth accelerator",
    accent: "blue",
    body: [
      `Franchise-level profitability is Yum!'s primary growth accelerator. Management has explicitly tied unit expansion and long-term value creation to improving four-wall economics for franchise partners, with payback periods of 2-3 years motivating continued reinvestment.`,
      `The franchise model delivers a 50.8% return on invested capital — more than double McDonald's 22.8% — while carrying negative shareholder equity of -$7.5B, a sign of extreme capital efficiency rather than distress.`,
      `Byte by Yum! AI agents can act as a direct profit driver for franchisees: lowering costs, raising store-level productivity, and reinforcing trust in the asset-light model itself.`,
    ],
  },
  {
    eyebrow: "Byte by Yum!",
    heading: "The AI platform, and where it's stretched thin",
    accent: "green",
    body: [
      `Byte by Yum! now runs across more than 35,000 restaurants in 150 countries, processing over $20B in digital sales. Yum! has adopted NVIDIA's open-source Nemotron small language models to synthetically generate more than 20,000 training records, achieving a 3x improvement in AI ordering-accuracy performance.`,
      `AI agents are already deployed for customer service — a KFC India chatbot handles order status, driver contact, and feedback — and for team-member support, including Pizza Hut UK's "Byte Coach," a chat interface for operational standards.`,
      `The next challenge is solving "costly data" fragmentation by building unified data models across every brand and market.`,
    ],
  },
  {
    eyebrow: "Sustainability & ESG",
    heading: "Risk management, not a side initiative",
    accent: "pink",
    body: [
      `Sustainability is built into Yum!'s growth strategy as a way of managing long-term risk and improving operational resilience. Scope 1 and 2 emissions are down 18% from a 2019 baseline, with corporate-owned restaurant emissions intensity improved by 40%.`,
      `GFSI-certified suppliers now cover 93% of the supply base, and the company has invested more than $74M fighting hunger. Climate-focused supply chain pilots span beef, dairy, soy, and chicken — including a KFC France farm emissions program and a Taco Bell U.S. beef partnership with the National Fish and Wildlife Foundation.`,
      `Packaging innovation — Pizza Hut U.S.'s recyclable wing bowl and Habit's fiber-based packaging — addresses both evolving regulation and consumer disclosure expectations.`,
    ],
  },
  {
    eyebrow: "Product Innovation",
    heading: "Boneless chicken, sauces & KWENCH",
    accent: "blue",
    body: [
      `KFC is putting boneless chicken at the center of its menu, with new tenders and a sauce lineup markets can tailor to local tastes — from Chimichurri Ranch to Hot Honey Habanero. The strategy is built around sustainable sales layers rather than one-off limited-time offers: bigger, crispier tenders and an expanded boneless range.`,
      `KWENCH by KFC, launched in the U.K., is the first real sub-brand in the portfolio — driving modern relevance even before it has full marketing support. A new visual identity and logo signal the brand's broader commitment to staying relevant with the next generation of consumers.`,
    ],
  },
  {
    eyebrow: "Innovation Diffusion",
    heading: "How winning ideas travel across 151 countries",
    accent: "green",
    body: [
      `KFC's global collaboration model captures the best ideas across 151 countries. A WhatsApp group connecting Food Innovation & Technology leaders lets markets share product innovations and launch them globally — a pickle promotion that started in Canada was picked up and better-executed in the U.K., and is now set to travel further still.`,
      `Taco Bell's LeBron James partnership, historically U.S.-only, was secured for global rights and deployed in China as part of Sean Tresvant's directive to "act more like a global brand." The result is a self-reinforcing loop where the strongest-performing markets export their winning strategies into underpenetrated regions.`,
    ],
  },
];

const IMMEDIATE_PRIORITIES = [
  "Launch a paid loyalty tier at Taco Bell within 30 days: convert roughly 10% of existing members at an incremental $5-10 ARPU, using the proven Yum China model.",
  "Accelerate the KWENCH rollout to KFC's top 20 markets, with AI-personalized recommendations targeting a $2-3 increase in average check size.",
  "Deploy Taco Bell crisis intelligence — real-time sentiment analysis, personalized re-engagement offers, and a transparency dashboard — to recover 5-10% of lost traffic within 30 days.",
  "Implement Byte by Yum! AI agents for proactive customer response and supply-chain risk monitoring.",
];

const RISKS = [
  "Taco Bell traffic decline accelerating from the recall",
  "Continued KFC U.S. share erosion from competitor innovation",
  "Byte by Yum! global data-integration hurdles",
];
const OPPORTUNITIES = [
  "Capital freed by the Pizza Hut divestiture",
  "KWENCH's potential as a scalable sub-brand",
  "Loyalty as a genuine demand-driving tool, not just a retention program",
];

const ROADMAP_RECAP = [
  { title: "Loyalty Premium Tier", body: "Launch a paid tier at Taco Bell within 30 days — the model is proven in China and the infrastructure is ready.", accent: "pink" },
  { title: "KWENCH Acceleration", body: "Deploy across KFC's top 20 markets by day 90, with AI-driven check growth built in from the start.", accent: "blue" },
  { title: "Crisis Intelligence", body: "Real-time sentiment analytics for recall recovery — transparency is what actually restores loyalty.", accent: "green" },
];

export default function YumStrategicAnalysisPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
        <Link href="/yum" className="text-[13px] font-semibold text-text-muted hover:text-text-primary">
          ← Back to the Yum! Brands proposal
        </Link>
        <div className="mt-6">
          <SectionEyebrow accent="pink">Strategic Analysis</SectionEyebrow>
          <h1 className="mt-3 font-display text-[34px] font-bold leading-tight text-text-primary sm:text-[42px]">
            Yum! Brands Strategic Analysis &amp;{" "}
            <span style={{ color: "var(--blue)" }}>Disruptive Growth Roadmap</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-text-secondary">
            Prepared by Quintessence Analytics. A category-level read on where Yum! is winning, where it's
            exposed, and the specific 30-90 day moves that convert current momentum into measurable growth.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-[26px] font-bold" style={{ color: ACCENT_VAR[s.accent] }}>{s.value}</p>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-text-primary">{s.label}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {SECTIONS.slice(0, 3).map((s, i) => {
        const Wrapper = i % 2 === 1 ? Band : "section";
        const wrapperProps = i % 2 === 1 ? {} : { className: "mx-auto max-w-5xl px-6 py-16" };
        return (
          <Wrapper key={s.heading} {...wrapperProps}>
            <SectionEyebrow accent={s.accent}>{s.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">{s.heading}</h2>
            <div className="mt-5 max-w-3xl space-y-4">
              {s.body.map((p, pi) => (
                <p key={pi} className="text-[15px] leading-relaxed text-text-secondary">{p}</p>
              ))}
            </div>
          </Wrapper>
        );
      })}

      {/* ── Immediate Priorities ── */}
      <Band>
        <SectionEyebrow accent="pink">Immediate Priorities</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">
          The next 30-90 days
        </h2>
        <ul className="mt-6 space-y-3">
          {IMMEDIATE_PRIORITIES.map((item, i) => (
            <li key={item} className="flex gap-3 rounded-xl border border-border bg-surface-raised px-5 py-4 text-[14.5px] leading-relaxed text-text-primary">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT_VAR[accentAt(i)] }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Band>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionEyebrow accent="blue">Consumer &amp; Category Trends</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">{SECTIONS[3].heading}</h2>
        <div className="mt-5 max-w-3xl space-y-4">
          {SECTIONS[3].body.map((p, pi) => (
            <p key={pi} className="text-[15px] leading-relaxed text-text-secondary">{p}</p>
          ))}
        </div>
      </section>

      {/* ── Risks & Opportunities ── */}
      <Band>
        <SectionEyebrow accent="green">Risks, Opportunities &amp; Leadership Priorities</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">
          What could go wrong, what's already going right
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-[15px] font-bold text-text-primary">Risks</h3>
            <ul className="mt-3 space-y-2.5">
              {RISKS.map((r) => (
                <li key={r} className="flex gap-2.5 text-[13.5px] leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--pink)" }} aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-[15px] font-bold text-text-primary">Opportunities</h3>
            <ul className="mt-3 space-y-2.5">
              {OPPORTUNITIES.map((o) => (
                <li key={o} className="flex gap-2.5 text-[13.5px] leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--green)" }} aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-text-secondary">
          CEO Chris Turner&apos;s stated priorities are to deepen consumer relevance, improve unit economics,
          scale AI globally, and allocate capital to maximize shareholder value. Success depends on executing
          loyalty transformation, crisis transparency, and AI-powered personalization at the same time, not
          sequentially.
        </p>
      </Band>

      {SECTIONS.slice(4).map((s, i) => {
        const idx = i + 4;
        const Wrapper = idx % 2 === 1 ? Band : "section";
        const wrapperProps = idx % 2 === 1 ? {} : { className: "mx-auto max-w-5xl px-6 py-16" };
        return (
          <Wrapper key={s.heading} {...wrapperProps}>
            <SectionEyebrow accent={s.accent}>{s.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">{s.heading}</h2>
            <div className="mt-5 max-w-3xl space-y-4">
              {s.body.map((p, pi) => (
                <p key={pi} className="text-[15px] leading-relaxed text-text-secondary">{p}</p>
              ))}
            </div>
          </Wrapper>
        );
      })}

      {/* ── Roadmap at a Glance / Closing ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionEyebrow accent="pink">Roadmap at a Glance</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[24px] font-bold leading-tight text-text-primary">
          Three moves, ninety days
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {ROADMAP_RECAP.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: ACCENT_VAR[r.accent] }} aria-hidden />
                <h3 className="font-display text-[16px] font-bold text-text-primary">{r.title}</h3>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-secondary">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-text-secondary">
          5% growth is achievable through disciplined, data-driven execution. The tools are ready and the
          opportunity is clear — what&apos;s required now is action.
        </p>

        <div className="mt-14 rounded-3xl px-8 py-14 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <SectionEyebrow accent="blue">Let&apos;s Discuss This Analysis</SectionEyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-[24px] font-bold leading-tight text-dark-text">
            We&apos;d welcome the chance to walk through this roadmap in detail
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--pink)" }}
          >
            Schedule a discovery workshop →
          </Link>
        </div>
      </section>
    </>
  );
}
