import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./chess-globals.css";

// Independent root layout for the /Chess-2000 section — a real, deliberate
// Next.js "multiple root layouts" split (via the (chess) route group),
// since Chess-2000's own dark-by-default, full-viewport game UI is a
// genuinely different experience from the rest of quintessenceanalytics.com
// and must not be wrapped in the site's own Header/Footer or fonts.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Chess-2000 — AI Chess Trainer",
  description: "Real Stockfish analysis explained in plain English — what's happening, what to play, and why.",
};

export default function ChessRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-ink">{children}</body>
    </html>
  );
}
