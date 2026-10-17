import { trackMeta } from "@/components/MetaPixel";

/** Google Ads conversion action "QA Lead" (account AW-18518475714, Submit lead form). */
const GOOGLE_ADS_LEAD = "AW-18518475714/C6_4CJus-J8dEMKHpv5E";

type Gtag = (...args: unknown[]) => void;

/** Records a sent enquiry form as a lead with Meta and Google Ads. Both tags load only after cookie
 * consent, so without it this does nothing. */
export function trackLead() {
  trackMeta("Lead");
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", "conversion", { send_to: GOOGLE_ADS_LEAD });
}
