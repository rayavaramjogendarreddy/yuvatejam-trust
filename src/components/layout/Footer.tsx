import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data/site-config";
import { footerNav } from "@/lib/data/navigation";
import { Phone, Mail, MapPin, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-12 pb-6 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          {/* Column 1: Trust Information */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
                <Image
                  src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png"
                  alt="YUVATEJAM TRUST Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-bold text-base text-white tracking-tight group-hover:text-brand-red transition-colors">
                  {siteConfig.name}
                </span>
                <span className="block text-[10px] text-brand-gold font-medium uppercase tracking-wider">
                  {siteConfig.registrationNo}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
              Empowering Lives, Transforming Communities. A registered non-governmental organization dedicated to education, health, livelihood, and women empowerment.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-xs text-slate-400">80G Tax Exemption Eligible</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-brand-red pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerNav.quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center space-x-1.5 text-slate-400"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-red flex-shrink-0" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Programs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-brand-red pl-2.5">
              Key Programs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerNav.causes.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center space-x-1.5 text-slate-400"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-red flex-shrink-0" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Trust */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-brand-red pl-2.5">
              Contact Trust
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span className="leading-tight">
                  {siteConfig.address}, {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors truncate">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/donate-now/"
                className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold px-4 py-2 rounded-lg shadow transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support Our Cause</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0 pt-2">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/faqs/" className="hover:text-slate-300 transition-colors">
              FAQs
            </Link>
            <Link href="/contact-us/" className="hover:text-slate-300 transition-colors">
              Contact Us
            </Link>
            <Link href="/donate-now/" className="hover:text-slate-300 transition-colors">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
