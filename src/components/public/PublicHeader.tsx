"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Menu,
  X,
  Shield,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Our Programs", href: "/programs" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Leadership", href: "/team" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification & Contact Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[11px] font-medium">
            <a
              href="tel:+919494486888"
              className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>+91 94944 86888</span>
            </a>
            <a
              href="mailto:yuvatejamtrust1@gmail.com"
              className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors hidden md:flex"
            >
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>yuvatejamtrust1@gmail.com</span>
            </a>
            <div className="flex items-center space-x-1.5 text-slate-400 hidden lg:flex">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Vuyyuru, Krishna District, AP</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="bg-slate-900 text-amber-400 font-bold px-2.5 py-0.5 rounded-full border border-slate-800">
              Regd. No. 124/2012 • 80G Tax-Exempt
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-2.5 py-0.5 rounded-full border border-red-500/30 font-semibold transition-colors"
              title="Manage trust data & media"
            >
              <Shield className="w-3 h-3 text-red-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png"
              alt="Yuvatejam Trust Logo"
              fill
              sizes="48px"
              className="object-contain group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <div>
            <span className="block font-black text-xl text-slate-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
              YUVATEJAM TRUST
            </span>
            <span className="block text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider uppercase mt-1">
              Educational &amp; Social Service
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? "text-red-600 bg-red-50"
                    : "text-slate-700 hover:text-red-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Donate CTA */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/donate-now"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>Donate Now</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  active
                    ? "bg-red-50 text-red-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/donate-now"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Online (80G Tax-Exempt)</span>
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-slate-900 text-slate-200 font-semibold py-2.5 rounded-xl text-xs"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
