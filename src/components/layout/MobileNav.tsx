"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/lib/data/navigation";
import { siteConfig } from "@/lib/data/site-config";
import { ChevronDown, Heart, Phone, Mail, X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="font-bold text-slate-900 text-sm tracking-tight">
            Menu Navigation
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable menu content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {mainNav.map((item) => {
            const hasSubmenu = item.children && item.children.length > 0;
            const isExpanded = openSubmenu === item.title;

            return (
              <div key={item.title} className="border-b border-slate-100 pb-1">
                <div className="flex items-center justify-between py-2">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-sm font-semibold text-slate-800 hover:text-brand-red"
                  >
                    {item.title}
                  </Link>
                  {hasSubmenu && (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="p-1 text-slate-400 hover:text-brand-red focus:outline-none"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-brand-red" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasSubmenu && isExpanded && (
                  <div className="pl-4 pb-2 space-y-1.5 bg-slate-50 rounded-lg py-2 mt-1">
                    {item.children?.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={onClose}
                        className="block text-xs font-medium text-slate-600 hover:text-brand-red py-1"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 space-y-3">
            <Link
              href="/donate-now/"
              onClick={onClose}
              className="flex items-center justify-center space-x-2 w-full bg-brand-red text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-brand-darkRed transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Now</span>
            </Link>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 bg-slate-900 text-slate-100 font-medium text-xs space-y-2 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-brand-red" />
            <span>{siteConfig.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
