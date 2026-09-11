"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star, Heart, CheckCircle2 } from "lucide-react";

export function BeneficiaryStories() {
  const stories = [
    {
      name: "Geetha K.",
      role: "Vidya Deevena Student, 8th Standard",
      location: "Vuyyuru Rural Mandal",
      program: "Mission Education",
      quote:
        "My parents work as daily agricultural laborers and could not afford private tuition or new textbooks. Joining the Yuvatejam evening study center gave me free books, guidance, and confidence. I scored 92% in my school exams this term!",
      impact: "Provided free study guide and 6 months remedial tutoring",
    },
    {
      name: "K. Lakshmi",
      role: "Self-Employed Tailor",
      location: "Penamaluru",
      program: "Women Empowerment",
      quote:
        "Learning tailoring through Yuvatejam's free vocational training was a turning point. After graduating, the trust gifted me a commercial sewing machine. Today, I stitch school uniforms and earn ₹8,500 every month to support my children.",
      impact: "Received free tailoring certification & sewing machine",
    },
    {
      name: "M. Appa Rao",
      role: "Senior Citizen Beneficiary",
      location: "Krishna District",
      program: "Annadhanam Food Relief",
      quote:
        "Living alone at an advanced age, cooking nutritious food was almost impossible. The volunteers of Yuvatejam bring hot, hygienic, wholesome meals with so much love and respect every single afternoon. They are like family.",
      impact: "Daily nutritious hot meal recipient",
    },
    {
      name: "N. Venkateswarlu",
      role: "Farmer & Village Resident",
      location: "Kankipadu",
      program: "Free Rural Health Camp",
      quote:
        "I was having blurry vision for months but couldn't travel to the city hospital. The Yuvatejam eye camp came right to our village school, tested my vision, and handed me prescription reading glasses for free on the spot.",
      impact: "Free diagnostic screening & prescription spectacles",
    },
  ];

  const [active, setActive] = useState(0);

  const prev = () => setActive((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  const next = () => setActive((prev) => (prev === stories.length - 1 ? 0 : prev + 1));

  const current = stories[active];

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Grassroots Impact Voices
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Stories of Transformed Lives
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prev}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-slate-400 font-bold px-2">
              {active + 1} / {stories.length}
            </span>
            <button
              onClick={next}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-2 flex md:justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <Quote className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="md:col-span-10 space-y-4">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal italic">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-800/80">
              <div>
                <h4 className="font-bold text-white text-base">{current.name}</h4>
                <p className="text-xs text-amber-400 font-semibold">{current.role} • {current.location}</p>
              </div>

              <div className="inline-flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-3 py-1 rounded-full text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{current.impact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story indicator pills */}
        <div className="flex justify-center space-x-2 pt-2">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-red-600" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
