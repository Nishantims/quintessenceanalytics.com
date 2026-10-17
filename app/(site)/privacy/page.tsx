import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Bullets, type LegalSection } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Privacy Policy — Quintessence Analytics",
  description:
    "What personal information quintessenceanalytics.com collects, why, who it is shared with, how long it is kept, and your rights.",
};

const EMAIL = "contact@quintessenceanalytics.com";
const mail = <a href={`mailto:${EMAIL}`} className="text-blue-ink hover:underline">{EMAIL}</a>;

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        This website, quintessenceanalytics.com, is run by Quintessence Analytics Private Limited (CIN:
        U73200TS2026PTC213924), a company incorporated in India with its office in Hyderabad, Telangana. We are the
        data controller (&quot;data fiduciary&quot; under India&apos;s Digital Personal Data Protection Act, 2023) for
        the information described here. Market-Reports.com, which we also operate, has its own{" "}
        <a href="https://www.market-reports.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-ink hover:underline">privacy policy</a>.
        Products on this site with their own privacy notice, such as Chess-2000, are covered by that notice.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p><strong className="text-text-primary">Information you give us.</strong> When you use a contact form or email us: your name, email address, company, the area you are interested in and your message, plus anything else you choose to include.</p>
        <p><strong className="text-text-primary">Information collected when you browse — only if you accept cookies.</strong> If you click &quot;Accept&quot; on our cookie banner, the Meta Pixel records which pages you visit, basic browser and device information, your IP address and the fact that a contact form was sent (not what you wrote in it). If you decline, the Pixel is not loaded.</p>
        <p><strong className="text-text-primary">Information our hosting needs.</strong> Our hosting provider keeps standard server logs (such as IP address, time and page requested) for security and to keep the site running.</p>
        <p><strong className="text-text-primary">Business contacts.</strong> We may email people at companies about services relevant to their role, using business contact details from publicly available sources. Every such email can be stopped by replying &quot;unsubscribe&quot;; we then keep only your email address on a do-not-contact list so we never email you again.</p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <Bullets
        items={[
          "To reply to your enquiry, scope a proposal and deliver the work you engage us for.",
          "To send you relevant information about our services; you can opt out at any time.",
          "To measure and improve our advertising on Facebook and Instagram — only if you accepted cookies.",
          "To keep the site secure, prevent misuse and meet our legal obligations.",
        ]}
      />
    ),
  },
  {
    heading: "Legal basis",
    body: (
      <p>
        We rely on your consent for advertising cookies; on taking steps at your request before entering a contract,
        and on performing that contract, for enquiries and engagements; on our legitimate interest in contacting
        businesses about relevant services and in keeping the site secure; and on legal obligations where the law
        requires us to keep records. Under India&apos;s DPDP Act we process your data for the purpose you gave it to
        us or with your consent, which you can withdraw at any time.
      </p>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>We do not sell personal information. We share it only with the service providers that run this site and our email, each for the purpose listed:</p>
        <Bullets
          items={[
            "Vercel — website hosting.",
            "Supabase — the database where contact-form enquiries are stored.",
            "Resend — delivery of contact-form notifications to our mailbox.",
            "Microsoft 365 — our email.",
            "Meta Platforms — advertising measurement through the Meta Pixel, only if you accepted cookies.",
          ]}
        />
        <p>We may also disclose information when the law requires it, or to protect our rights, our users or the public.</p>
      </>
    ),
  },
  {
    heading: "International transfers",
    body: (
      <p>
        Some of these providers store or process data outside India, including in the United States and the European
        Union. Where they do, we rely on their contractual data-protection commitments, including standard
        contractual clauses where those apply.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        Enquiries and related emails are kept for as long as we need them to respond and follow up, and for up to
        three years after our last contact with you, unless you ask us to delete them sooner. Contracts and invoices
        are kept for as long as Indian tax and company law requires. Do-not-contact entries are kept indefinitely so
        that an opt-out stays respected.
      </p>
    ),
  },
  {
    heading: "Cookies and similar storage",
    body: (
      <>
        <Bullets
          items={[
            <><code className="text-[13px]">qa-cookie-consent</code> (stored in your browser) — remembers whether you accepted or declined cookies. Always used.</>,
            <><code className="text-[13px]">qa-theme</code> (stored in your browser) — remembers light or dark mode. Always used.</>,
            <><code className="text-[13px]">_fbp</code> and related Meta cookies — advertising measurement. Only after you click &quot;Accept&quot;; Meta keeps <code className="text-[13px]">_fbp</code> for up to 90 days.</>,
          ]}
        />
        <p>You can change your choice at any time: <CookieSettingsButton className="text-blue-ink underline" />.</p>
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>Wherever you are, you can ask us to:</p>
        <Bullets
          items={[
            "tell you what personal information we hold about you and give you a copy;",
            "correct it or complete it;",
            "delete it, where we are not required to keep it;",
            "stop using it for marketing, or withdraw a consent you gave;",
            "nominate someone to exercise these rights for you (DPDP Act).",
          ]}
        />
        <p>
          Email {mail}; we reply within 30 days. If you are not satisfied, you can complain to the Data Protection Board
          of India, or, in the European Union or United Kingdom, to your local data-protection authority.
        </p>
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        The site is served only over HTTPS, and access to enquiries is limited to the people who need it to respond.
        No system is perfectly secure; if a breach affects your personal information we will tell you and the
        relevant authority as the law requires.
      </p>
    ),
  },
  {
    heading: "Children",
    body: <p>This site and our services are for businesses. We do not knowingly collect information from anyone under 18.</p>,
  },
  {
    heading: "Contact and grievances",
    body: (
      <p>
        For any privacy question, request or complaint, write to {mail}, or by post to Quintessence Analytics Private
        Limited, Hyderabad, Telangana, India. See also our <Link href="/terms" className="text-blue-ink hover:underline">Terms of Use</Link>.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: <p>If we change this policy we will update the date at the top of this page; significant changes will also be shown on the site.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="17 October 2026"
      intro={<p>This policy explains what personal information quintessenceanalytics.com collects, why, who it is shared with, how long it is kept and the choices you have.</p>}
      sections={SECTIONS}
    />
  );
}
