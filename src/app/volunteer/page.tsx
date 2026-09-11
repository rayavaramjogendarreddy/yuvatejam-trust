"use client";

import React, { useState } from "react";
import {
  UserCheck,
  CheckCircle2,
  Heart,
  BookOpen,
  Stethoscope,
  Utensils,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { addVolunteer } from "@/lib/trustData";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Vuyyuru");
  const [interest, setInterest] = useState("Vidya Deevena Tutoring");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addVolunteer({
        name,
        email,
        phone,
        location,
        interest,
        notes,
      });
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-12 pb-16">
        {/* HERO */}
        <section className="bg-slate-950 text-white py-14 md:py-18 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join the Movement</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Volunteer With Yuvatejam Trust
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Lend your time, passion, and skills to uplift rural children, assist in health camps, and feed the vulnerable across Krishna District.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 sm:p-10 border-b border-slate-100 space-y-2">
                <h2 className="text-2xl font-black text-slate-900">
                  Volunteer Application Form
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Please fill out your details below. Our field volunteer coordinator will contact you for an orientation session.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-700">Full Name *</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
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
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
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
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-700">City / Location *</span>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Vuyyuru / Vijayawada"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-semibold text-slate-700">Primary Area of Interest *</span>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-red-600"
                  >
                    <option value="Vidya Deevena Tutoring">
                      Mission Education / Vidya Deevena (Tutoring &amp; School Kits)
                    </option>
                    <option value="Free Medical Camps">
                      Healthcare &amp; Free Medical Diagnostic Camps
                    </option>
                    <option value="Annadhanam Food Distribution">
                      Annadhanam Nutritious Daily Meal Drives
                    </option>
                    <option value="Women Empowerment Workshops">
                      Women Vocational Tailoring &amp; Self-Reliance
                    </option>
                    <option value="Flood & Emergency Relief">
                      Krishna River Basin Emergency Flood Relief
                    </option>
                    <option value="Media & Photography">
                      Photography, Social Media &amp; Content Creation
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-semibold text-slate-700">Experience / Comments (Optional)</span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your background, skills, or available hours..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Your details will be registered directly in our trust volunteer database.
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-full text-xs transition-colors shadow-lg disabled:opacity-50"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{loading ? "Registering..." : "Submit Volunteer Application"}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-2xl p-8 sm:p-12 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Thank You for Joining Us, {name}!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Your volunteer application for <strong>{interest}</strong> has been received and added to the Yuvatejam Trust roster. Our coordination team will reach out to you shortly at <strong>{phone}</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setNotes("");
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 hover:text-red-700"
                >
                  <span>Submit Another Application</span>
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
