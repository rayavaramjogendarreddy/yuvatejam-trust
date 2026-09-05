import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
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
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": siteConfig.name,
  "legalName": siteConfig.legalName,
  "url": "https://yuvatejamtrust.org/",
  "logo": "https://yuvatejamtrust.org/images/yuvatejam-trust-logo.png",
  "description": siteConfig.tagline,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address,
    "addressLocality": "Vuyyuru",
    "addressRegion": siteConfig.state,
    "postalCode": siteConfig.pincode,
    "addressCountry": "IN",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.phone,
    "contactType": "customer service",
    "email": siteConfig.email,
  },
  "sameAs": [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": "https://yuvatejamtrust.org/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 text-slate-900 selection:bg-brand-red selection:text-white">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
