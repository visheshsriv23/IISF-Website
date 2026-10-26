import type { Metadata, Viewport } from "next";
import { Archivo_Black, Baloo_2, Caveat, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/lib/site";
import "./globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const grotesk = Space_Grotesk({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const caveat = Caveat({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const baloo = Baloo_2({ weight: ["600"], subsets: ["devanagari"], variable: "--font-baloo", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "IISF KNIT Sultanpur · Got an idea? Apply.", template: "%s · IISF KNIT" },
  description: SITE.description,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FFF8E7" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${grotesk.variable} ${caveat.variable} ${baloo.variable}`}>
      {/* suppressHydrationWarning: browser extensions inject attributes on <body> */}
      <body className="min-h-dvh" suppressHydrationWarning>
        {children}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
