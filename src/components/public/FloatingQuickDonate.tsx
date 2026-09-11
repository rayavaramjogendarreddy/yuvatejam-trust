"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  X,
  QrCode,
  Phone,
  ShieldCheck,
  Award,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

export function FloatingQuickDonate() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = "9494486888@upi";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Pill Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black px-5 py-3 rounded-full shadow-2xl hover:shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 border border-red-400/30"
          aria-label="Quick donate modal"
        >
          <Heart className="w-4 h-4 fill-white animate-pulse" />
          <span className="text-xs font-bold tracking-wide">Quick 80G Donate</span>
        </button>
      </div>

      {/* Popover Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full sm:w-96 bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black text-xs">
                  YT
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-none">
                    YUVATEJAM TRUST
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Regd. No. 124/2012 • 80G Certified
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick UPI Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center space-x-1.5">
                  <QrCode className="w-4 h-4 text-red-600" />
                  <span>Instant UPI Transfer</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Zero Fee
                </span>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-mono font-bold text-slate-800 text-xs">
                  {upiId}
                </span>
                <button
                  onClick={handleCopyUpi}
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-red-600 hover:text-red-700 px-2 py-1 bg-red-50 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                Works with Google Pay, PhonePe, Paytm, BHIM &amp; Banking Apps.
              </p>
            </div>

            {/* Helpline */}
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>Need support?</span>
              </span>
              <a
                href="tel:+919494486888"
                className="font-bold text-slate-900 hover:text-red-600"
              >
                +91 94944 86888
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Link
                href="/donate-now"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Donate &amp; Get 80G Tax Receipt</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
