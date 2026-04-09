import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";
import { StickyQuoteBar } from "@/components/shared/StickyQuoteBar";
import { SITE_NAME } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rubyseas.com"),
  title: {
    default: `${SITE_NAME} | Global Seafood Supply`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium frozen seafood with EU/FDA compliance, MSC-certified fisheries, and QR traceability from ocean to table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen pb-28 font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyQuoteBar />
      </body>
    </html>
  );
}
