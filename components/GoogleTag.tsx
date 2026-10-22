"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from "@/components/CookieConsent";

// Google tag for the Quintessence Analytics Google Ads account, so search ads can measure leads.
// Google Consent Mode v2: the tag is on every page from the start but stores nothing (consent "denied") until the
// visitor accepts cookies (CookieConsent). It used to load only after Accept, which Google Ads reports as
// "Some of your landing pages are not tagged" (seen on the Market-Reports.com account, 2026-10-22).
const GOOGLE_ADS_ID = "AW-18518475714";

type Gtag = (...args: unknown[]) => void;
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

export function GoogleTag() {
  useEffect(() => {
    const update = () => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (gtag) gtag("consent", "update", readConsent() === "accepted" ? GRANTED : DENIED);
    };
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var accepted = false;
try { accepted = localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === "accepted"; } catch (e) {}
gtag('consent', 'default', accepted ? ${JSON.stringify(GRANTED)} : ${JSON.stringify({ ...DENIED, wait_for_update: 500 })});
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
    </>
  );
}
