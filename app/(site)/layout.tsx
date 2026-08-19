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
  title: "Quintessence Analytics — Enterprise AI Solutions & AI Assurance",
  description:
    "Quintessence Analytics builds enterprise AI agents, automates real workflows, and evaluates AI systems for reliability, security, and governance — from a $1,200 AI Readiness Assessment to full enterprise implementation. Parent company of Market Reports.",
  metadataBase: new URL("https://quintessenceanalytics.com"),
  openGraph: {
    title: "Quintessence Analytics — Enterprise AI Solutions & AI Assurance",
    description:
      "Build AI. Automate work. Trust the outcome. AI agents, workflow automation, and independent AI assurance for enterprise teams moving from experimentation to production.",
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
