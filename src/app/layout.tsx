import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "INT.46 VizLab — Sales-Driven Visuals for Real Estate Developers",
  description:
    "Architectural CGI that supports pre-sales, investor presentations, and planning approvals. Trusted by Solida Capital, XIOR, and leading European developers.",
  openGraph: {
    title: "INT.46 VizLab",
    description: "Sales-Driven Visuals for Real Estate Developers",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen" style={{ backgroundColor: "#0D0D0D", color: "#F2F0ED" }}>
        {children}
      </body>
    </html>
  );
}
