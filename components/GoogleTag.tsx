"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, readConsent } from "@/components/CookieConsent";

// Google tag for the Quintessence Analytics Google Ads account, so search ads can measure leads.
// Loads only after the visitor accepts cookies (CookieConsent), like MetaPixel.
const GOOGLE_ADS_ID = "AW-18518475714";

export function GoogleTag() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => setConsented(readConsent() === "accepted");
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
