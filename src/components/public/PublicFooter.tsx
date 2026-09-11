import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Shield,
  ArrowUpRight,
  ExternalLink,
  Award,
  CheckCircle2,
} from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner with 80G & Legal Tax Benefit */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/60 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">
                Tax Exemption Under Section 80G
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                All donations to Yuvatejam Educational &amp; Social Service Trust are 50% tax exempt under Sec 80G of the Income Tax Act.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Link
              href="/donate-now"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 rounded-full text-xs shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Contribute with 80G Receipt</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Organization Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png"
                  alt="Yuvatejam Trust Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-black text-xl text-white tracking-tight">
                  YUVATEJAM TRUST
                </span>
                <span className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Educational &amp; Social Service
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Dedicated to rural upliftment, child education, hunger eradication, free community health checkups, and women empowerment across Krishna District and Andhra Pradesh since 2012.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <p className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Govt. Regd. Non-Profit: <strong>Regd. No. 124/2012</strong></span>
              </p>
              <p className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>PAN &amp; 12A/80G Compliant Financial Audits</span>
              </p>
              <p className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Founder &amp; Chairman: <strong>Dr. SHAIK Karimulla</strong></span>
              </p>
            </div>
          </div>

          {/* Key Programs */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Our Initiatives
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  Vidya Deevena (Child Education)
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  Annadhanam (Daily Meal Drives)
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  Free Rural Health &amp; Eye Camps
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  Women Tailoring &amp; Livelihood
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-red-400 transition-colors">
                  Krishna Basin Disaster Relief
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-red-400 transition-colors">
                  About the Trust &amp; History
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-red-400 transition-colors">
                  Board of Trustees &amp; Committee
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-400 transition-colors">
                  Verified Photo Gallery (134+ Photos)
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-red-400 transition-colors">
                  Join as Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate-now" className="hover:text-red-400 transition-colors">
                  Donate Online
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-red-400 transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              Registered Office
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>
                  D.No: 1-124, Main Road, Near Bus Stand, Vuyyuru, Krishna District, Andhra Pradesh - 521165
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="tel:+919494486888" className="hover:text-white transition-colors">
                  +91 94944 86888
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href="mailto:yuvatejamtrust1@gmail.com" className="hover:text-white transition-colors">
                  yuvatejamtrust1@gmail.com
                </a>
              </p>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Trustee / Staff Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Yuvatejam Educational &amp; Social Service Trust. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Regd. No. 124/2012</span>
            <span>Sec. 80G Certified</span>
            <Link href="/dashboard" className="hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
