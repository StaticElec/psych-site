import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site-content";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: { default: siteContent.metadata.siteTitle, template: siteContent.metadata.titleTemplate },
  description: siteContent.metadata.siteDescription,
  icons: { icon: siteContent.images.branding.favicon.src, shortcut: siteContent.images.branding.favicon.src },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const backgroundStyle = { "--page-background-image": `url('${siteContent.images.branding.pageBackground.src}')` } as React.CSSProperties;
  return <html lang="en" className={openSans.variable}><body style={backgroundStyle}><SiteHeader />{children}<SiteFooter /></body></html>;
}
