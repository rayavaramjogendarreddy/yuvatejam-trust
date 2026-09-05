"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data/site-config";
import { mainNav } from "@/lib/data/navigation";
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Heart } from "lucide-react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top bar */}
      <div className="bg-brand-navy text-slate-100 font-medium text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-red" />
              <span>{siteConfig.email}</span>
            </a>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-brand-red" />
              <span>{siteConfig.city}, {siteConfig.state}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-slate-800 text-brand-gold font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
              {siteConfig.registrationNo}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-header shadow-md py-3"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <Image
                src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/yuvatejam-trust-logo.png"
                alt="YUVATEJAM TRUST Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-bold text-lg md:text-xl text-brand-navy tracking-tight group-hover:text-brand-red transition-colors">
                YUVATEJAM TRUST
              </span>
              <span className="block text-[10px] md:text-xs font-medium text-slate-500 tracking-wide uppercase">
                Educational & Social Service
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {mainNav.map((item) => {
              const hasSubmenu = item.children && item.children.length > 0;
              return (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => hasSubmenu && setActiveDropdown(item.title)}
                  onMouseLeave={() => hasSubmenu && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-red rounded-md transition-colors"
                  >
                    <span>{item.title}</span>
                    {hasSubmenu && (
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-transform group-hover:rotate-180 duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSubmenu && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 w-64 pt-2 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-150">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="block px-4 py-2.5 text-xs md:text-sm font-medium text-slate-800 hover:text-emerald-900 hover:bg-emerald-50/80 transition-colors"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/donate-now/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-red to-brand-darkRed text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:from-brand-darkRed hover:to-brand-red transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span>Donate Now</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-brand-red hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
