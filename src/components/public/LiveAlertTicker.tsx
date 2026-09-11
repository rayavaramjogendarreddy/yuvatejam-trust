"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Radio, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export function LiveAlertTicker() {
  const updates = [
    {
      badge: "LIVE OPERATIONS",
      text: "Annadhanam Relief: 500+ hot nutritious meals distributed today at Vuyyuru Center.",
      actionText: "Support Meals",
      href: "/donate-now?cause=Annadhanam%20Daily%20Meals",
    },
    {
      badge: "MISSION EDUCATION",
      text: "Vidya Deevena Study Guide Centers currently holding evening tutoring hours.",
      actionText: "Sponsor a Student",
      href: "/donate-now?cause=Mission%20Education%20%E2%80%94%20Vidya%20Deevena",
    },
    {
      badge: "RURAL HEALTHCARE",
      text: "Free Village Eye & Diagnostic Health Camp scheduled for this Sunday.",
      actionText: "Volunteer Now",
      href: "/volunteer",
    },
    {
      badge: "STATUTORY BENEFIT",
      text: "All donor contributions receive immediate Section 80G 50% income tax deduction certificates.",
      actionText: "Claim 80G",
      href: "/donate-now",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [updates.length]);

  const active = updates[currentIndex];

  return (
    <div className="bg-slate-900 text-slate-200 border-y border-slate-800 text-xs py-2.5 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
              {active.badge}
            </span>
          </div>

          <p className="truncate font-medium text-slate-200 transition-all duration-300">
            {active.text}
          </p>
        </div>

        <Link
          href={active.href}
          className="flex-shrink-0 inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold transition-colors text-[11px]"
        >
          <span>{active.actionText}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
