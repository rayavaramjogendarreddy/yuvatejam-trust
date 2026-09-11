"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Utensils,
  Stethoscope,
  Users,
  ShieldAlert,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
  Award,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { LiveAlertTicker } from "@/components/public/LiveAlertTicker";
import { ImpactCalculator } from "@/components/public/ImpactCalculator";
import { PhotoActivityReel } from "@/components/public/PhotoActivityReel";
import { BeneficiaryStories } from "@/components/public/BeneficiaryStories";
import { FloatingQuickDonate } from "@/components/public/FloatingQuickDonate";

export default function HomePage() {
  const focusAreas = [
    {
      title: "Mission Education (Vidya Deevena)",
      category: "Education",
      desc: "Free bridge courses, evening tutoring centers, and educational study guides for rural students to prevent dropouts.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/13-2.jpg",
      badge: "Flagship",
      metric: "49,246+ Children Supported",
      href: "/programs",
    },
    {
      title: "Annadhanam Meal Drives",
      category: "Food Relief",
      desc: "Daily nutritious meals, festive food drives, and emergency rations for elderly, homeless, and patients.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg",
      badge: "Essential",
      metric: "25,000+ Meals Served",
      href: "/programs",
    },
    {
      title: "Rural Health & Eye Camps",
      category: "Healthcare",
      desc: "Free comprehensive medical diagnostic camps, pediatric checkups, vision tests, and medicine distribution.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/21.jpg",
      badge: "Healthcare",
      metric: "50+ Camps Conducted",
      href: "/programs",
    },
    {
      title: "Women Vocational Empowerment",
      category: "Livelihood",
      desc: "Tailoring kits, certified garment sewing workshops, and financial literacy to empower women.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg",
      badge: "Self-Reliance",
      metric: "500+ Women Trained",
      href: "/programs",
    },
    {
      title: "Krishna Basin Flood Relief",
      category: "Disaster Response",
      desc: "Emergency drinking water canisters, dry rations, hygiene essentials, and rehabilitation in flood-hit villages.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/2-1.jpg",
      badge: "Emergency",
      metric: "500+ Families Assisted",
      href: "/programs",
    },
    {
      title: "Orphaned & Vulnerable Children Care",
      category: "Child Protection",
      desc: "Nutritious supplementary diets, educational study guides, and moral support for underprivileged children.",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/IMG-20250204-WA0100.jpg",
      badge: "Welfare",
      metric: "Continuous Care",
      href: "/programs",
    },
  ];

  const milestones = [
    { year: "2012", tag: "Inception", title: "Trust Registration", desc: "Registered as Yuvatejam Educational & Social Service Trust (Regd. No. 124/2012) in Vuyyuru, Andhra Pradesh." },
    { year: "2015", tag: "Education", title: "Mission Education Launch", desc: "Established remedial study centers and scholarship kits for rural schoolchildren across Krishna District." },
    { year: "2019", tag: "Healthcare", title: "Free Health Camps Expansion", desc: "Conducted medical checkup camps, eye diagnostic drives, and blood donation camps in remote villages." },
    { year: "2024+", tag: "Expansion", title: "Holistic Community Empowerment", desc: "Scaled daily Annadhanam food relief, women's tailoring workshops, and disaster relief response." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-red-600 selection:text-white">
      <PublicHeader />
      <LiveAlertTicker />

      <main className="flex-grow space-y-16 md:space-y-24 pb-20">
        {/* HERO SECTION */}
        <section className="relative bg-slate-950 text-white pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b-4 border-red-600">
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/banner-1024x515.jpg')",
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/90" />

          {/* Animated decorative glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 font-bold rounded-full tracking-wider uppercase px-4 py-1.5 text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Regd. No. 124/2012 • 13+ Years of Grassroots Service</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
            >
              Empowering Lives, <br />
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Building Resilient Communities.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
            >
              Yuvatejam Educational &amp; Social Service Trust is dedicated to fostering quality education, health clinics, hunger relief, and self-reliance for children, women, and underserved rural families in Andhra Pradesh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/donate-now"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black px-8 py-4 rounded-full shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 text-base"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Donate &amp; Change a Life</span>
              </Link>
              <Link
                href="/programs"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-4 rounded-full border border-slate-700 hover:border-slate-600 transition-colors text-base"
              >
                <span>Explore Our Programs</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 flex flex-wrap items-center justify-center gap-6 border-t border-slate-800/80 text-xs text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Community Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>80G Tax Exemption (50% Benefit)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent Financial Audits</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* IMPACT METRICS COUNTER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="text-center space-y-1">
              <span className="block text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                49,246+
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Children Educated
              </span>
            </div>
            <div className="text-center space-y-1 pt-6 md:pt-0">
              <span className="block text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                50+
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Rural Medical Camps
              </span>
            </div>
            <div className="text-center space-y-1 pt-6 md:pt-0">
              <span className="block text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                25,000+
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Nutritious Meals Served
              </span>
            </div>
            <div className="text-center space-y-1 pt-6 md:pt-0">
              <span className="block text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                500+
              </span>
              <span className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                Women Empowered
              </span>
            </div>
          </div>
        </section>

        {/* LIVE PHOTO REEL MARQUEE */}
        <PhotoActivityReel />

        {/* FLAGSHIP INITIATIVE SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 text-white border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-700 group">
                <Image
                  src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/13-2.jpg"
                  alt="Mission Education - Student Receiving Study Materials"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Flagship Program
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Transforming Rural Futures
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Mission Education — Vidya Deevena
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Education is the ultimate catalyst for breaking cycles of poverty. Through Vidya Deevena, Yuvatejam Trust operates free non-formal tutoring centers, distributes textbooks, uniforms, and geometry boxes, and helps rural children stay in school.
                </p>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-200">
                  <p className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Free remedial tutoring &amp; bridge courses in Krishna District</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Focus on girl child education and retention in higher primary classes</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>100% transparent sponsorship: direct distribution to verified students</span>
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href="/donate-now?cause=Mission%20Education%20%E2%80%94%20Vidya%20Deevena"
                    className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-full text-xs transition-colors shadow-lg"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Sponsor a Child&apos;s Education</span>
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center space-x-2 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    <span>Read Full Program Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FOCUS AREAS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center space-x-1.5 font-bold uppercase tracking-wider px-3.5 py-1 text-xs bg-red-50 text-red-600 rounded-full border border-red-100">
              Community Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Key Programs &amp; Initiatives
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We address grassroots vulnerabilities across healthcare, nutrition, skills, and disaster relief to create lasting, self-reliant change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-red-600 uppercase shadow-sm">
                    {item.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {item.metric}
                    </span>
                    <Link
                      href={item.href}
                      className="inline-flex items-center space-x-1 text-red-600 font-bold hover:text-red-700"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE IMPACT CALCULATOR WIDGET */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImpactCalculator />
        </section>

        {/* FOUNDER & CHAIRMAN MESSAGE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500/10 rounded-3xl border border-amber-500/20 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-lg">
                  <Image
                    src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg"
                    alt="Dr. SHAIK Karimulla"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-black text-lg text-slate-900">Dr. SHAIK Karimulla</h4>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wide">
                    Founder &amp; Chairman
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Yuvatejam Educational &amp; Social Service Trust
                  </p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Leadership Voice
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  &ldquo;Direct grassroots service is not charity; it is our social duty.&rdquo;
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  When we founded Yuvatejam Trust in 2012 in Vuyyuru, our commitment was straightforward: every rupee entrusted to us must directly touch a life. Whether providing school kits to a child who would otherwise drop out, providing warm meals during hard times, or teaching a mother how to sew to earn her own livelihood — we measure success in smiles, dignity, and independence.
                </p>
                <div className="pt-2">
                  <Link
                    href="/team"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    <span>Meet the Full Board of Trustees</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIARY STORIES & TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeneficiaryStories />
        </section>

        {/* MILESTONES & JOURNEY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Our Journey Since 2012
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Yuvatejam Trust Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-red-600 font-mono">{m.year}</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                    {m.tag}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{m.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 80G TAX EXEMPTION & DONATION CALLOUT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>80G Income Tax Exemption</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Make a Meaningful Contribution Today
              </h3>
              <p className="text-red-100 text-sm leading-relaxed">
                Your generosity provides uniforms to school children, hot meals to vulnerable families, and medical camps in rural Andhra Pradesh. All contributions receive instant 80G tax exemption certificates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/donate-now"
                className="inline-flex items-center justify-center space-x-2 bg-white text-red-700 hover:bg-red-50 font-black px-8 py-4 rounded-full shadow-lg transition-all text-sm"
              >
                <Heart className="w-4 h-4 fill-red-700 text-red-700" />
                <span>Donate Online</span>
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center space-x-2 bg-red-900/60 hover:bg-red-900 text-white font-bold px-6 py-4 rounded-full border border-red-400/40 transition-colors text-sm"
              >
                <Users className="w-4 h-4" />
                <span>Volunteer With Us</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingQuickDonate />
      <PublicFooter />
    </div>
  );
}
