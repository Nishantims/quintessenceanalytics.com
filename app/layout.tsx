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
  title: "Quintessence Analytics — AI Analytics & Decision Intelligence",
  description:
    "Quintessence Analytics is an AI analytics and decision intelligence company transforming enterprise data into actionable business decisions with AI, predictive analytics, automation, and executive dashboards — parent company of Market Reports.",
  metadataBase: new URL("https://quintessenceanalytics.com"),
  openGraph: {
    title: "Quintessence Analytics — AI Analytics & Decision Intelligence",
    description:
      "AI, predictive analytics, automation, and executive dashboards for enterprise teams who make decisions on evidence, not instinct.",
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
