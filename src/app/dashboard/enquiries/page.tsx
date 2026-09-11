"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Search, Mail, Phone, Calendar, CheckCircle2, Clock } from "lucide-react";
import { getEnquiries, EnquiryRecord } from "@/lib/trustData";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [search, setSearch] = useState("");

  const refreshData = () => {
    setEnquiries(getEnquiries());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("yt_data_updated", refreshData);
    return () => window.removeEventListener("yt_data_updated", refreshData);
  }, []);

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            <span>Contact &amp; General Enquiries</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage public website contact submissions, donor queries, and partnership requests.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sender name or subject..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Messages: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold ${item.status === 'New' ? 'bg-red-950 text-red-400 border border-red-800/60' : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'}`}>
                  {item.status === 'New' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  <span>{item.status}</span>
                </span>
                <h3 className="font-bold text-base text-white mt-1">{item.subject}</h3>
              </div>
              <p className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>{item.date}</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/60 font-normal">
              &quot;{item.message}&quot;
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-white">{item.name}</span>
                <span className="flex items-center space-x-1 text-slate-400"><Mail className="w-3 h-3 text-slate-500" /><span>{item.email}</span></span>
                <span className="flex items-center space-x-1 text-slate-400"><Phone className="w-3 h-3 text-slate-500" /><span>{item.phone}</span></span>
              </div>
              <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors">
                Send Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
