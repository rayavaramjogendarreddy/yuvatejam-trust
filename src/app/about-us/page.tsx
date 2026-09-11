"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Award,
  CheckCircle2,
  ShieldCheck,
  Users,
  Target,
  Compass,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export default function AboutUsPage() {
  const values = [
    {
      title: "Grassroots Direct Impact",
      desc: "We work directly on the ground in rural villages, ensuring aid reaches verified beneficiaries without middlemen.",
      icon: Users,
    },
    {
      title: "Uncompromising Integrity",
      desc: "Full financial transparency with regular statutory audits, 80G certification, and public accountability.",
      icon: ShieldCheck,
    },
    {
      title: "Holistic Empowerment",
      desc: "Combining education, health, livelihood, and emergency relief to create lasting self-reliance for families.",
      icon: Target,
    },
    {
      title: "Compassion in Action",
      desc: "Serving every individual with dignity and equality, irrespective of caste, religion, gender, or background.",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-16 md:space-y-24 pb-16">
        {/* PAGE HEADER HERO */}
        <section className="bg-slate-950 text-white py-16 md:py-20 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <span>About Yuvatejam Trust</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              A Decade of Dedicated Service in Andhra Pradesh
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Founded in 2012 in Vuyyuru, Krishna District, Yuvatejam Educational &amp; Social Service Trust has been a beacon of hope, dignity, and opportunity for over 50,000 rural lives.
            </p>
          </div>
        </section>

        {/* FOUNDER & CHAIRMAN SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center p-8 md:p-12">
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
                  <Image
                    src="https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg"
                    alt="Dr. SHAIK Karimulla - Founder & Chairman"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 right-4 bg-slate-950 text-white px-5 py-2.5 rounded-xl shadow-lg text-xs font-bold border border-slate-800">
                  Founder &amp; Chairman
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                  Founding Visionary
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Dr. SHAIK Karimulla
                </h2>
                <h3 className="text-sm font-semibold text-slate-600">
                  Founder &amp; Chairman, Yuvatejam Educational &amp; Social Service Trust
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  &ldquo;When we commenced our work in 2012, our heart was stirred by the sight of young children abandoning school due to the lack of basic textbooks, mothers struggling to feed their infants, and elderly individuals suffering without basic medical checkups.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Yuvatejam was born out of a determination to build a reliable bridge of compassion. We do not look for headlines — we look for children who need tutoring, women who need sewing machines to earn respect, and families displaced by monsoon river floods who need hot meals and clean drinking water.&rdquo;
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                  <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100">
                    Regd. No. 124/2012
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
                    80G Income Tax Certified
                  </span>
                  <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100">
                    Vuyyuru, Krishna District
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-950 to-slate-900 text-white rounded-3xl p-8 md:p-10 border border-red-900/40 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Our Vision</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                To create an equitable, self-reliant, and compassionate society where every child receives quality education, no family goes hungry, healthcare is accessible to all, and women have the dignity of financial independence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-10 border border-slate-800 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-slate-950" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Our Mission</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                To implement grassroots welfare interventions across Andhra Pradesh through remedial study centers, daily and emergency food distributions, free rural medical camps, and vocational skill workshops, upholding the highest standards of transparency.
              </p>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{v.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-3xl p-8 md:p-12 text-white border border-slate-800 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black">
              Join Our Mission of Grassroots Transformation
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              Whether as a volunteer tutor, medical professional, or donor, your contribution makes a direct difference in Krishna District.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate-now"
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-full text-xs transition-colors shadow-lg"
              >
                Donate Online (80G Tax-Exempt)
              </Link>
              <Link
                href="/volunteer"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-full text-xs transition-colors border border-slate-700"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
