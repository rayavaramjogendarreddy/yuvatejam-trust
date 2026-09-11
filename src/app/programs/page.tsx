"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  BookOpen,
  Utensils,
  Stethoscope,
  Scissors,
  ShieldAlert,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export default function ProgramsPage() {
  const programs = [
    {
      id: "education",
      title: "Mission Education — Vidya Deevena",
      category: "Education",
      icon: BookOpen,
      location: "Vuyyuru, Penamaluru & Krishna District Rural Centers",
      beneficiaries: "49,246+ Underprivileged Children",
      budget: "₹4,50,000 / Batch",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/13-2.jpg",
      highlight: "Over 87% students mainstreamed into formal schools with academic honors.",
      overview: "Vidya Deevena operates community learning centers offering free after-school remedial tutoring, homework support, textbooks, school bags, and stationery sets to children of daily wage workers and single mothers.",
      keyPoints: [
        "Daily remedial classes in mathematics, science, and English",
        "Free distribution of notebooks, school bags, and geometry kits",
        "Special focus on girl-child education retention and counseling",
        "Nutritious evening snacks provided during tutoring sessions",
      ],
    },
    {
      id: "annadhanam",
      title: "Annadhanam Daily Meals & Hunger Relief",
      category: "Food Relief",
      icon: Utensils,
      location: "Krishna District Hospitals, Slums & Bus Stands",
      beneficiaries: "25,000+ Nutritious Meals Served",
      budget: "₹6,00,000 / Cycle",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg",
      highlight: "Zero-waste daily food drives providing hot freshly prepared hygienic meals.",
      overview: "No one should go to sleep hungry. Yuvatejam Trust prepares and distributes wholesome, balanced meals to elderly destitute persons, hospital attendees, and day laborers who cannot afford two square meals a day.",
      keyPoints: [
        "Freshly prepared hot meals served with protein-rich lentils and vegetables",
        "Targeted distribution around government hospitals and railway stations",
        "Special festival meal drives on Independence Day, Republic Day, and Ugadi",
        "Sanitized mobile food van ensuring hot food reaches remote hamlet pockets",
      ],
    },
    {
      id: "health",
      title: "Free Rural Health, Diagnostic & Eye Camps",
      category: "Healthcare",
      icon: Stethoscope,
      location: "Remote Villages & Mandal Headquarters",
      beneficiaries: "50+ Camps, 18,000+ Patients Examined",
      budget: "₹2,80,000 / Camp Cycle",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/21.jpg",
      highlight: "Free vision screening with prescription spectacles and cataract referral.",
      overview: "Many rural residents ignore early disease symptoms due to lack of local clinics and transport costs. Our mobile medical teams bring doctors, diagnostic equipment, and free medications right to village doorsteps.",
      keyPoints: [
        "General physical checkups, blood sugar, and BP screening",
        "Vision testing and free distribution of reading spectacles",
        "Pediatric wellness and deworming medicine distribution for school kids",
        "Free follow-up consultations and specialist hospital referrals",
      ],
    },
    {
      id: "women",
      title: "Women Vocational Skill & Tailoring Training",
      category: "Women Empowerment",
      icon: Scissors,
      location: "Trust Vocational Training Center, Vuyyuru",
      beneficiaries: "500+ Rural Women Certified",
      budget: "₹3,20,000 / Course",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg",
      highlight: "Free sewing machines provided to top performing graduates for home enterprises.",
      overview: "Economic self-reliance gives women a voice, safety, and dignity. Our intensive 3-month tailoring and embroidery courses equip rural women and young widows with commercial stitching skills to earn a dignified livelihood.",
      keyPoints: [
        "Professional certification in garment stitching and dress designing",
        "Free distribution of tailoring starter kits and measuring tools",
        "Financial literacy and micro-savings guidance",
        "Handicrafts market linkage for selling finished garments",
      ],
    },
    {
      id: "disaster",
      title: "Krishna Basin Monsoon Flood & Crisis Relief",
      category: "Disaster Relief",
      icon: ShieldAlert,
      location: "Low-lying river basin villages across Krishna District",
      beneficiaries: "500+ Displaced Families Assisted",
      budget: "₹1,90,000 / Relief Operation",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/2-1.jpg",
      highlight: "Rapid volunteer deployment within 6 hours of flood alert warnings.",
      overview: "When monsoon overflows displace families in the river delta, Yuvatejam Trust mobilizes immediate emergency relief packs containing clean drinking water, dry food rations, tarpaulins, blankets, and essential medications.",
      keyPoints: [
        "Safe packaged drinking water canes to prevent waterborne infections",
        "Dry ration kits (rice, pulses, oil, matchboxes, salt, and spices)",
        "Temporary shelter tarpaulins and waterproof ground mats",
        "Post-flood sanitation bleaching and medical checkups",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-16 md:space-y-24 pb-16">
        {/* PAGE HERO */}
        <section className="bg-slate-950 text-white py-16 md:py-20 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grassroots Welfare Initiatives</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Our Key Programs &amp; Social Initiatives
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Every initiative of Yuvatejam Trust is structured with clear impact metrics, field volunteer oversight, and direct benefit delivery across Andhra Pradesh.
            </p>
          </div>
        </section>

        {/* DETAILED PROGRAM CARDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={prog.id}
                id={prog.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl p-6 sm:p-8 md:p-10"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  {/* Media Column */}
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase shadow-sm">
                        {prog.category}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block uppercase font-bold text-[10px]">Impact Footprint</span>
                        <span className="font-bold text-slate-900">{prog.beneficiaries}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block uppercase font-bold text-[10px]">Budget Allocation</span>
                        <span className="font-bold text-emerald-600 font-mono">{prog.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>{prog.location}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {prog.title}
                      </h2>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs text-amber-900 font-medium">
                      {prog.highlight}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {prog.overview}
                    </p>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                      <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                        Program Scope &amp; Deliverables:
                      </h4>
                      {prog.keyPoints.map((pt, pIdx) => (
                        <p key={pIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </p>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/donate-now?cause=${encodeURIComponent(prog.title)}`}
                        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow-md"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Support This Initiative</span>
                      </Link>

                      <Link
                        href="/volunteer"
                        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-red-600"
                      >
                        <span>Volunteer for this Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* BOTTOM SECTION: 80G RECEIPT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-4 border border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-black">
              100% Directed Donations with 80G Tax Exemption
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              When you donate to Yuvatejam Trust, you can specify exactly which initiative your contribution should fund. You will receive an instantaneous 80G tax exemption certificate.
            </p>
            <div className="pt-2">
              <Link
                href="/donate-now"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 rounded-full text-sm shadow-xl"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to a Cause</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
