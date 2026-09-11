"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  Award,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  CreditCard,
  QrCode,
  Building,
  ArrowRight,
  Info,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { addDonation } from "@/lib/trustData";

export default function DonateNowPage() {
  const searchParams = useSearchParams();
  const defaultCause = searchParams.get("cause") || "Mission Education — Vidya Deevena";

  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>(defaultCause);

  // Donor form
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "NetBanking">("UPI");

  // Flow state
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    receiptNumber: string;
    donorName: string;
    amount: number;
    panNumber: string;
    program: string;
    transactionId: string;
    date: string;
  } | null>(null);

  const presetAmounts = [
    { amount: 500, label: "₹500", desc: "Study books & stationery set for 2 students" },
    { amount: 1000, label: "₹1,000", desc: "25 nutritious Annadhanam hot meals" },
    { amount: 2500, label: "₹2,500", desc: "Health checkup & eye diagnostics for 10 elderly" },
    { amount: 5000, label: "₹5,000", desc: "Sewing machine & tailoring kit for a woman" },
    { amount: 10000, label: "₹10,000", desc: "Complete bridge course sponsorship for 1 child" },
  ];

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  const taxSaving = Math.round(effectiveAmount * 0.5);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount <= 0) {
      alert("Please specify a valid donation amount.");
      return;
    }
    if (!donorName || !email || !phone) {
      alert("Please fill in your basic contact details.");
      return;
    }

    setLoading(true);

    // Simulate payment processing & 80G tax receipt generation
    setTimeout(() => {
      const txnId = "YT" + Math.floor(100000000 + Math.random() * 900000000);
      const newRec = addDonation({
        donorName,
        amount: effectiveAmount,
        panNumber: panNumber ? panNumber.toUpperCase() : "APPLIED FOR",
        program: selectedProgram,
        paymentMethod: paymentMethod === "UPI" ? "UPI (GPay/PhonePe)" : paymentMethod,
        transactionId: txnId,
      });

      setReceiptData(newRec);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-12 pb-16">
        {/* HERO */}
        <section className="bg-slate-950 text-white py-14 md:py-18 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>Section 80G Tax-Exempt Contribution</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Invest in Grassroots Lives
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Every contribution provides nutritious food, child education kits, and community medical care in Andhra Pradesh. All donations qualify for a 50% income tax deduction under Sec 80G.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!receiptData ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <form onSubmit={handleDonateSubmit} className="p-6 sm:p-10 space-y-8">
                {/* 1. Choose Initiative */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide">
                    1. Select Welfare Program
                  </label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-semibold focus:outline-none focus:border-red-600"
                  >
                    <option value="Mission Education — Vidya Deevena">
                      Mission Education (Vidya Deevena) — Child Tutoring &amp; School Kits
                    </option>
                    <option value="Annadhanam Daily Meals">
                      Annadhanam — Nutritious Meal Drives &amp; Hunger Relief
                    </option>
                    <option value="Free Rural Health & Eye Camps">
                      Free Rural Health, Diagnostics &amp; Eye Camps
                    </option>
                    <option value="Women Vocational Tailoring Kits">
                      Women Empowerment — Tailoring Workshops &amp; Sewing Machines
                    </option>
                    <option value="Krishna Basin Disaster Relief">
                      Krishna River Basin Flood &amp; Emergency Crisis Relief
                    </option>
                    <option value="General Trust Corpus Fund">
                      General Trust Corpus (Where Most Needed)
                    </option>
                  </select>
                </div>

                {/* 2. Choose Amount */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide">
                      2. Choose Donation Tier
                    </label>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      80G Benefit: ~₹{taxSaving.toLocaleString("en-IN")} Tax Exemption
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {presetAmounts.map((tier) => {
                      const active = !customAmount && selectedAmount === tier.amount;
                      return (
                        <button
                          type="button"
                          key={tier.amount}
                          onClick={() => {
                            setSelectedAmount(tier.amount);
                            setCustomAmount("");
                          }}
                          className={`p-4 rounded-2xl border text-center transition-all flex flex-col justify-between space-y-2 ${
                            active
                              ? "border-red-600 bg-red-50/70 shadow-md ring-2 ring-red-500"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <span className="text-xl font-black text-slate-900">
                            {tier.label}
                          </span>
                          <span className="text-[11px] text-slate-500 leading-tight">
                            {tier.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom amount */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Or enter custom amount (₹ INR):
                    </label>
                    <div className="relative w-full sm:w-72">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="100"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="e.g. 15000"
                        className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Donor Details */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide">
                    3. Donor Information (For 80G Certificate)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700">Full Name *</span>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-red-600 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700">Email Address *</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-red-600 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700">Mobile Phone *</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-red-600 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-semibold text-slate-700 flex items-center justify-between">
                        <span>PAN Card Number (Required for 80G)</span>
                        <span className="text-[10px] text-slate-500 font-normal">Income Tax Dept. Rule</span>
                      </span>
                      <input
                        type="text"
                        maxLength={10}
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono tracking-wider uppercase focus:outline-none focus:border-red-600 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Payment Gateway Selection */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wide">
                    4. Payment Mode
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("UPI")}
                      className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-colors ${
                        paymentMethod === "UPI"
                          ? "border-red-600 bg-red-50/60 font-bold text-red-700"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-red-600" />
                      <span>UPI (GPay / PhonePe / QR)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Card")}
                      className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-colors ${
                        paymentMethod === "Card"
                          ? "border-red-600 bg-red-50/60 font-bold text-red-700"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("NetBanking")}
                      className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-colors ${
                        paymentMethod === "NetBanking"
                          ? "border-red-600 bg-red-50/60 font-bold text-red-700"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <Building className="w-5 h-5 text-red-600" />
                      <span>Net Banking / NEFT</span>
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 space-y-1">
                    <p className="flex items-center space-x-1.5 font-semibold text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>256-Bit SSL Encrypted &amp; Statutory 80G Receipt</span>
                    </p>
                    <p>Yuvatejam Educational &amp; Social Service Trust (Regd. 124/2012)</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black px-8 py-4 rounded-full shadow-xl transition-all text-sm disabled:opacity-50"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>
                      {loading ? "Generating 80G Receipt..." : `Complete Donation: ₹${effectiveAmount.toLocaleString("en-IN")}`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* OFFICIAL 80G TAX RECEIPT VIEW */
            <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-2xl p-6 sm:p-10 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2 pb-6 border-b border-slate-200">
                <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 font-bold px-3.5 py-1 rounded-full text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Contribution Successfully Processed</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Official 80G Tax Exemption Donation Receipt
                </h2>
                <p className="text-slate-500 text-xs">
                  Yuvatejam Educational &amp; Social Service Trust • Regd. No. 124/2012
                </p>
              </div>

              {/* Receipt Body */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 font-mono text-xs text-slate-800">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-sans text-[10px] uppercase font-bold">Receipt Number</span>
                    <span className="font-bold text-red-600 text-sm">{receiptData.receiptNumber}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-sans text-[10px] uppercase font-bold">Transaction Reference</span>
                    <span className="font-bold">{receiptData.transactionId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 font-sans">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Donor Name</span>
                    <span className="font-bold text-sm text-slate-900">{receiptData.donorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Donor PAN</span>
                    <span className="font-mono font-bold text-slate-900">{receiptData.panNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Donation Amount</span>
                    <span className="font-bold text-base text-emerald-600 font-mono">
                      ₹{receiptData.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Allocated Initiative</span>
                    <span className="font-bold text-slate-900">{receiptData.program}</span>
                  </div>
                </div>

                <div className="font-sans text-[11px] text-slate-500 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Statutory Tax Certification:</p>
                  <p>
                    Certified that donations to Yuvatejam Educational &amp; Social Service Trust qualify for 50% deduction under Section 80G of the Income Tax Act 1961.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Registered Address: D.No: 1-124, Main Road, Near Bus Stand, Vuyyuru, Krishna District, Andhra Pradesh - 521165.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReceiptData(null)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <span>Make Another Contribution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
