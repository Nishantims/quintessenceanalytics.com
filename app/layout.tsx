import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";

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
  title: "Quintessence Analytics — Distilled Market Intelligence",
  description:
    "Quintessence Analytics is a data and market-intelligence consultancy delivering custom research, predictive analytics, business intelligence, and competitive benchmarking — parent company of Market Reports.",
  metadataBase: new URL("https://quintessenceanalytics.com"),
  openGraph: {
    title: "Quintessence Analytics — Distilled Market Intelligence",
    description:
      "Custom research, predictive analytics, business intelligence, and competitive benchmarking for teams who make decisions on evidence, not instinct.",
    url: "https://quintessenceanalytics.com",
    siteName: "Quintessence Analytics",
    type: "website",
  },
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
      </body>
    </html>
  );
}
