"use client";

import React from "react";
import Image from "next/image";
import Link from "next/image";
import {
  Users,
  ShieldCheck,
  Award,
  Heart,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

export default function TeamPage() {
  const leadership = [
    {
      name: "Dr. SHAIK Karimulla",
      role: "Founder & Chairman",
      category: "Executive Leadership",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg",
      bio: "Visionary founder steering Yuvatejam Trust since 2012. Leads grassroots social strategy, program conception, and community outreach across Krishna District and Andhra Pradesh.",
      expertise: "Social Welfare Policy, Rural Health Outreach, Community Mobilization",
    },
    {
      name: "S. Abdul Baseed",
      role: "Treasurer & Managing Trustee",
      category: "Executive Leadership",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/S.Abdul-BaseedTreasurer-1014x1024.jpg",
      bio: "Manages financial governance, 80G statutory tax compliance, budget disbursements, and annual audit integrity ensuring 100% accountability to donors.",
      expertise: "Financial Governance, Statutory Audits, 80G Receipts & Compliance",
    },
    {
      name: "Executive Committee & Field Coordinators",
      role: "Core Operations Body",
      category: "Field Committee",
      image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Newteam.jpg",
      bio: "Active committee members and field logistics coordinators driving weekly food distribution, volunteer management, and flood relief response in river basin villages.",
      expertise: "Field Volunteer Logistics, Emergency Relief, Camp Logistics",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-16 md:space-y-24 pb-16">
        {/* HERO */}
        <section className="bg-slate-950 text-white py-16 md:py-20 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trust Leadership &amp; Governance</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Board of Trustees &amp; Committee
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Meet the dedicated leadership team guiding Yuvatejam Educational &amp; Social Service Trust with integrity, grassroots vision, and transparent stewardship.
            </p>
          </div>
        </section>

        {/* TEAM CARDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-red-600 uppercase shadow-sm">
                    {member.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <span className="block font-bold text-[10px] uppercase text-slate-400">
                      Core Responsibilities:
                    </span>
                    <span className="font-medium text-slate-700">{member.expertise}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOVERNANCE PRINCIPLES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Statutory Compliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Our Commitment to Open Governance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">Statutory Trust Registration</h4>
                <p>
                  Registered legally under the Indian Trusts Act as Yuvatejam Educational &amp; Social Service Trust (Regd. No. 124/2012).
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h4 className="font-bold text-white text-sm">80G &amp; 12A Certification</h4>
                <p>
                  Authorized by the Income Tax Department to issue 80G tax exemption certificates to individual and institutional donors.
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <Users className="w-6 h-6 text-blue-400" />
                <h4 className="font-bold text-white text-sm">Zero Administrative Waste</h4>
                <p>
                  Direct distribution model ensures that maximum resource percentage goes straight into field beneficiary welfare.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
