"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { addEnquiry } from "@/lib/trustData";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      addEnquiry({
        name,
        email,
        phone,
        subject,
        message,
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
              <span>Get in Touch</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Contact Yuvatejam Trust
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Have questions regarding our programs, health camps, donation receipts, or volunteering? Reach out directly to our registered headquarters in Vuyyuru.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-3">
                  Registered Headquarters
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">Trust Office Address:</strong>
                      <p className="mt-1">
                        D.No: 1-124, Main Road, Near Bus Stand,<br />
                        Vuyyuru, Krishna District,<br />
                        Andhra Pradesh - 521165, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">Official Helpline:</strong>
                      <a href="tel:+919494486888" className="hover:text-red-600 transition-colors font-medium">
                        +91 94944 86888
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">Direct Email:</strong>
                      <a href="mailto:yuvatejamtrust1@gmail.com" className="hover:text-red-600 transition-colors font-medium">
                        yuvatejamtrust1@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">Office Timings:</strong>
                      <p className="mt-1">
                        Monday – Saturday: 9:00 AM – 6:00 PM<br />
                        Sunday: Closed for field logistics
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-900 block">Legal Identity:</span>
                  <p>Yuvatejam Educational &amp; Social Service Trust</p>
                  <p className="text-red-600 font-semibold">Regd. No. 124/2012 • 80G Tax Exemption Certified</p>
                </div>
              </div>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Send Us a Message
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Fill out the form below and our administrative team will respond within 24 hours.
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700">Full Name *</span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700">Phone Number (Optional)</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-semibold text-slate-700">Subject *</span>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="e.g. Requesting medical camp / 80G receipt query"
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="font-semibold text-slate-700">Message *</span>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your enquiry or message here..."
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Submissions are stored securely in our official enquiry log.
                      </span>

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-full text-xs transition-colors shadow-lg disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{loading ? "Sending..." : "Submit Enquiry"}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-xl font-bold text-slate-900">Message Successfully Sent!</h4>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto">
                      Thank you for contacting Yuvatejam Trust. Your enquiry has been received and added to our admin inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubject("");
                        setMessage("");
                        setSubmitted(false);
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 underline pt-2"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
