import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/data/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "YUVATEJAM TRUST - Educational & Social Service",
    template: "%s | YUVATEJAM TRUST",
  },
  description: siteConfig.tagline,
  keywords: [
    "Yuvatejam Trust",
    "NGO Andhra Pradesh",
    "Social Service Vuyyuru",
    "Education Program",
    "Free Medical Camp",
    "Women Empowerment",
    "Food Distribution",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL("https://yuvatejamtrust.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yuvatejamtrust.org",
    title: siteConfig.name,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 text-slate-900 selection:bg-brand-red selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
