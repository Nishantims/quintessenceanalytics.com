import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Bullets, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Quintessence Analytics",
  description: "The terms that apply to using quintessenceanalytics.com and to engaging Quintessence Analytics for services.",
};

const EMAIL = "contact@quintessenceanalytics.com";

const SECTIONS: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        quintessenceanalytics.com is run by Quintessence Analytics Private Limited (CIN: U73200TS2026PTC213924), a
        company incorporated in India (&quot;Quintessence Analytics&quot;, &quot;we&quot;, &quot;us&quot;). By using
        this website you agree to these terms. If you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    heading: "Our services",
    body: (
      <>
        <p>
          We provide AI workflow automation, AI agent development, enterprise data analytics, AI data and knowledge
          systems, and AI evaluation and governance services. Every engagement is set out in a written proposal or
          statement of work that describes the scope, deliverables, timeline and price.
        </p>
        <p>
          If that proposal or statement of work says something different from these terms, the proposal or statement
          of work applies for that engagement.
        </p>
      </>
    ),
  },
  {
    heading: "Prices and payment",
    body: (
      <Bullets
        items={[
          "Prices shown on this site are starting points. The price of an engagement is the one in its signed proposal.",
          "Payment is due as set out in the proposal, for example a share on signing and the rest on delivery.",
          "Prices exclude taxes; Indian GST or other applicable taxes are added where the law requires.",
          "Refunds, if any, are as set out in the proposal for that engagement.",
        ]}
      />
    ),
  },
  {
    heading: "Deliverables and intellectual property",
    body: (
      <>
        <p>
          Unless the proposal says otherwise, once you have paid in full you own the deliverables we create
          specifically for you, and you may use them within your organisation. We keep ownership of our own tools,
          code libraries, methods and know-how that existed before the engagement or that we develop independently,
          and you receive the right to use any of them included in your deliverables.
        </p>
        <p>
          The content of this website — text, graphics, logos and design — belongs to us. You may view and share it
          for your own reference, but not copy, republish or sell it without our written permission.
        </p>
      </>
    ),
  },
  {
    heading: "Confidentiality",
    body: (
      <p>
        We keep the information you share with us for an engagement confidential, use it only to deliver that
        engagement and share it only with people who need it to do the work. We are happy to sign your mutual
        non-disclosure agreement before you share sensitive information.
      </p>
    ),
  },
  {
    heading: "AI systems and your decisions",
    body: (
      <p>
        AI systems can make mistakes, and their behaviour can change as data and models change. We design, test and
        review what we deliver, but you remain responsible for how you use AI outputs and for the business decisions
        you make with them. Information on this website is general and is not professional advice for your
        situation.
      </p>
    ),
  },
  {
    heading: "Acceptable use of the website",
    body: (
      <Bullets
        items={[
          "Do not try to gain unauthorised access to the site or its systems, or disrupt them.",
          "Do not scrape or bulk-download the site's content.",
          "Do not use our contact forms to send spam or unlawful content.",
        ]}
      />
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          To the extent the law allows, we are not liable for indirect or consequential losses, or for loss of profit,
          revenue, data or business opportunity.
        </p>
        <p>
          Our total liability for an engagement is limited to the fees you paid us for that engagement in the twelve
          months before the claim. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    heading: "Links to other websites",
    body: (
      <p>
        This site links to other websites, including Market-Reports.com, which has its own terms. We are not
        responsible for the content or practices of websites we do not run.
      </p>
    ),
  },
  {
    heading: "Privacy",
    body: (
      <p>
        How we handle personal information is explained in our{" "}
        <Link href="/privacy" className="text-blue-ink hover:underline">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. The courts of Hyderabad, Telangana, India have exclusive
        jurisdiction over any dispute arising from them, unless a signed proposal says otherwise.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <p>
        We may update these terms; the date at the top of this page shows when they last changed. Questions:{" "}
        <a href={`mailto:${EMAIL}`} className="text-blue-ink hover:underline">{EMAIL}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="17 October 2026"
      intro={<p>These terms apply when you use quintessenceanalytics.com or engage Quintessence Analytics for services.</p>}
      sections={SECTIONS}
    />
  );
}
