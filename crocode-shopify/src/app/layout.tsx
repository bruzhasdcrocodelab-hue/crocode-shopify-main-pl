import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/sections";
import HeaderWrapper from "@/components/sections/header/HeaderWrapper";
import { HeaderThemeProvider } from "@/contexts/HeaderThemeContext";
import { NextIntlClientProvider } from "next-intl";
import "@/styles/index.scss";
import "@/styles/root.scss";
import CustomCursor from "@/components/ui/Cursor";
import CookieBanner from "@/components/ui/CookieBanner";

const geistInter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crocode",
  description:
    "Official Shopify Premier Partner and Shopify Plus agency delivering enterprise development, integrations, and growth solutions for global brands.",
  other: {
    "google-site-verification": "0W03882me_pmKgPBCkZaTbs2AyPL_QqrYSshZmnc8po",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistInter.variable}>
        <Script
          id="google-analytics-script"
          src="https://www.googletagmanager.com/gtag/js?id=G-J7LW9DWBQT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J7LW9DWBQT');
        `}
        </Script>
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "ed361aa1-d0e9-4073-ac92-8639c34d42ea";
          window.CRISP_RUNTIME_CONFIG = {
            locale: "pl"
          };

          (function () {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `}
        </Script>
        <CustomCursor />
        <HeaderThemeProvider>
          <NextIntlClientProvider>
            <HeaderWrapper />
            <main className="main">{children}</main>
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
        </HeaderThemeProvider>
      </body>
    </html>
  );
}
