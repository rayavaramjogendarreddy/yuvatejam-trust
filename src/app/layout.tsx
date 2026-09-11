import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUVATEJAM TRUST — Educational & Social Service (Regd. No. 124/2012)",
  description: "Official portal of Yuvatejam Educational & Social Service Trust. Empowering rural communities through education, healthcare, nutrition, and livelihood.",
  icons: {
    icon: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased font-sans selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
