"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, readConsent } from "@/components/CookieConsent";

// Meta Pixel (Quintessence Analytics Business portfolio dataset), so Meta ads
// can measure leads and retarget site visitors. Loads only after the visitor
// accepts cookies (CookieConsent), and is revoked if they later decline.
// Counts a PageView on the first load and on every client-side page change;
// the contact form adds a Lead.
export const META_PIXEL_ID = "2541687396306024";

type Fbq = (...args: unknown[]) => void;

export function trackMeta(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", event, params);
}

export function MetaPixel() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const check = () => {
      const ok = readConsent() === "accepted";
      setConsented(ok);
      const fbq = (window as unknown as { fbq?: Fbq }).fbq;
      if (fbq) fbq("consent", ok ? "grant" : "revoke");
    };
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  if (!consented) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
