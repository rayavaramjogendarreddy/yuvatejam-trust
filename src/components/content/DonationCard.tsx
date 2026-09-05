"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Check } from "lucide-react";

interface DonationCardProps {
  className?: string;
  compact?: boolean;
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export default function DonationCard({ className = "", compact = false }: DonationCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);

  return (
    <div
      className={`bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-800 space-y-5 h-auto relative overflow-hidden ${className}`}
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center space-x-2 bg-brand-red/20 border border-brand-red/40 px-3 py-1 rounded-full text-brand-gold text-xs font-semibold">
        <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red animate-pulse" />
        <span>Support Our Mission</span>
      </div>

      {/* Heading */}
      <h3 className={`${compact ? "text-lg" : "text-xl md:text-2xl"} font-bold text-white tracking-tight leading-snug`}>
        Make a Direct Difference Today
      </h3>

      {/* Paragraph */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg font-normal">
        Your generous donation powers our education programs, healthcare camps, and emergency food drives across underprivileged communities.
      </p>

      {/* Preset Amount Chips (Adaptive: 2 cols on mobile 320px, 4 cols on tablet/desktop) */}
      {!compact && (
        <div className="space-y-2 pt-1">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Select Contribution Amount
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-500/30 shadow-sm"
                      : "bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                  <span className="whitespace-nowrap">₹{amt.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tax Exemption badge & CTA Button */}
      <div className="pt-2 space-y-3">
        <Link
          href={`/donate-now/?amount=${selectedAmount}`}
          className="w-full min-h-[48px] inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-red to-brand-darkRed hover:from-brand-darkRed hover:to-brand-red text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Donate ₹{selectedAmount.toLocaleString()} Now</span>
        </Link>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tax Exemption Available • Regd. Trust 124/2012</span>
        </div>
      </div>
    </div>
  );
}
