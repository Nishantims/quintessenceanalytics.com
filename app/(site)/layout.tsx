import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { MetaPixel } from "@/components/MetaPixel";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleTag } from "@/components/GoogleTag";

// Inter everywhere — matches market-reports.com's own font exactly, per
// explicit request, instead of this site having its own separate typeface.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Quintessence Analytics — AI Automation, Software & Data Analytics",
  description:
    "Name the task your team repeats and we automate it: product listings, catalogue images, invoice matching, WhatsApp enquiries, reports and more. AI automation, software and data analytics from US$1,000. Parent company of Market Reports.",
  metadataBase: new URL("https://www.quintessenceanalytics.com"),
  openGraph: {
    title: "Quintessence Analytics — AI Automation, Software & Data Analytics",
    description:
      "100 tasks we automate with AI and software - from product listings and catalogue images to invoice matching and customer enquiries. Free task audit; pilots from US$1,000.",
    url: "https://www.quintessenceanalytics.com",
    siteName: "Quintessence Analytics",
    type: "website",
  },
  // Meta (Facebook) Business portfolio domain verification for quintessenceanalytics.com.
  other: { "facebook-domain-verification": "uzqfebmwyda1r90e0v245uf0zbqva2" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MetaPixel />
        <GoogleTag />
        <CookieConsent />
      </body>
    </html>
  );
}
