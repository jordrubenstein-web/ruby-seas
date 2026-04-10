import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";
import { StickyQuoteBar } from "@/components/shared/StickyQuoteBar";
import { SITE_NAME } from "@/lib/constants";

const googleFontsHref =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rubyseas.com"),
  title: {
    default: `${SITE_NAME} | Global Seafood Supply`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium lobster and crab for foodservice and retail across North America — global infrastructure, proven sourcing, and cold-chain discipline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={googleFontsHref} rel="stylesheet" />
      </head>
      <body className="min-h-screen pb-20 font-sans md:pb-[4.5rem]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyQuoteBar />
      </body>
    </html>
  );
}
