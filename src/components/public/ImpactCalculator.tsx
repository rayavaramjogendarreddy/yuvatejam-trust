"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Award,
  BookOpen,
  Utensils,
  Stethoscope,
  Scissors,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function ImpactCalculator() {
  const [amount, setAmount] = useState<number>(2500);

  const getDeliverable = (val: number) => {
    if (val < 1000) {
      return {
        title: "Child Education Starter Kit",
        desc: `Provides 2 rural students with complete semester notebooks, textbooks, geometry sets, and school bags through Vidya Deevena.`,
        icon: BookOpen,
        color: "text-blue-500",
        bg: "bg-blue-50",
      };
    } else if (val < 2500) {
      const meals = Math.round(val / 40);
      return {
        title: "Annadhanam Nutritious Meals",
        desc: `Prepares and serves approximately ${meals} hot, hygienic, wholesome meals to destitute individuals, hospital attendees, and day laborers.`,
        icon: Utensils,
        color: "text-amber-500",
        bg: "bg-amber-50",
      };
    } else if (val < 5000) {
      const people = Math.round(val / 250);
      return {
        title: "Rural Health & Eye Diagnostics",
        desc: `Funds comprehensive medical checkups, blood sugar & BP screening, and free reading spectacles for ${people} elderly rural residents.`,
        icon: Stethoscope,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    } else if (val < 10000) {
      return {
        title: "Women Vocational Livelihood Kit",
        desc: `Directly funds a brand new sewing machine and complete commercial tailoring accessories kit for an underprivileged rural woman.`,
        icon: Scissors,
        color: "text-rose-500",
        bg: "bg-rose-50",
      };
    } else {
      const children = Math.round(val / 5000);
      return {
        title: "Full-Term Educational Sponsorship",
        desc: `Comprehensively sponsors remedial tutoring, nutrition, school uniforms, and mentoring for ${children} children for an entire school year.`,
        icon: Sparkles,
        color: "text-purple-500",
        bg: "bg-purple-50",
      };
    }
  };

  const deliverable = getDeliverable(amount);
  const taxSavings = Math.round(amount * 0.5);
  const effectiveCost = amount - taxSavings;

  const presets = [500, 1000, 2500, 5000, 10000, 25000];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="inline-flex items-center space-x-1.5 bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Transparent Giving Calculator</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            See Your Direct Grassroots Impact
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Choose a contribution amount to see tangible deliverables and your Section 80G tax benefit.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-800">
            50% Deduction Under Section 80G
          </span>
        </div>
      </div>

      {/* Preset Amount Badges */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Contribution Amount:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {presets.map((val) => (
            <button
              type="button"
              key={val}
              onClick={() => setAmount(val)}
              className={`py-3 px-2 rounded-xl text-sm font-black transition-all ${
                amount === val
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
              }`}
            >
              ₹{val.toLocaleString("en-IN")}
            </button>
          ))}
        </div>

        {/* Range Slider */}
        <div className="pt-4 space-y-2">
          <div className="flex justify-between text-xs text-slate-500 font-semibold font-mono">
            <span>₹500</span>
            <span className="text-red-600 font-bold text-sm">
              ₹{amount.toLocaleString("en-IN")}
            </span>
            <span>₹50,000</span>
          </div>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
        </div>
      </div>

      {/* Impact Result Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <div className="md:col-span-8 flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-2xl ${deliverable.bg} ${deliverable.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
            <deliverable.icon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Direct Community Deliverable
            </span>
            <h4 className="text-lg font-black text-slate-900">
              {deliverable.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {deliverable.desc}
            </p>
          </div>
        </div>

        {/* 80G Tax Exemption Calculation */}
        <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Donation Amount:</span>
            <span className="font-mono font-bold text-slate-900">₹{amount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>80G Tax Deduction (50%):</span>
            <span className="font-mono font-bold">-₹{taxSavings.toLocaleString("en-IN")}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
            <span>Net Cost to You:</span>
            <span className="font-mono text-sm text-red-600">~₹{effectiveCost.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
          Instant digital 80G receipt issued with QR verification &amp; statutory registration details.
        </span>

        <Link
          href={`/donate-now?amount=${amount}`}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-xs"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Contribute ₹{amount.toLocaleString("en-IN")} Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
