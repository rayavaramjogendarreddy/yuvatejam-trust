"use client";

import React, { useState } from "react";
import { HeartHandshake, Plus, Search, MapPin, Calendar, Users, Edit3, Trash2 } from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  location: string;
  beneficiaries: string;
  budget: string;
  status: "Active" | "Completed" | "Planned";
}

const INITIAL_PROGRAMS: ProgramItem[] = [
  { id: "1", title: "Vidya Deevena Bridge Course & Tutoring", category: "Education", location: "Vuyyuru Center", beneficiaries: "350+ Students", budget: "₹4,50,000", status: "Active" },
  { id: "2", title: "Annadhanam Daily Meals Distribution", category: "Food Relief", location: "Krishna District", beneficiaries: "1,200+ Families", budget: "₹6,00,000", status: "Active" },
  { id: "3", title: "Free Rural Eye Checkup & Medical Camp", category: "Healthcare", location: "Penamaluru Mandalam", beneficiaries: "850+ Patients", budget: "₹2,80,000", status: "Completed" },
  { id: "4", title: "Women Vocational Tailoring & Skill Training", category: "Empowerment", location: "Trust HQ Vuyyuru", beneficiaries: "150 Women", budget: "₹3,20,000", status: "Active" },
  { id: "5", title: "Monsoon Flood Relief & Clean Water Canes", category: "Disaster Relief", location: "River Basin Villages", beneficiaries: "500+ Families", budget: "₹1,90,000", status: "Completed" },
];

export default function ProgramsPage() {
  const [programs] = useState<ProgramItem[]>(INITIAL_PROGRAMS);
  const [search, setSearch] = useState("");

  const filtered = programs.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <HeartHandshake className="w-6 h-6 text-emerald-400" />
            <span>Programs &amp; Key Initiatives</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage social welfare initiatives, beneficiary metrics, locations, and funding budgets.
          </p>
        </div>

        <button className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search program or category..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Programs: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-800/60 uppercase">
                  {item.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-base text-white leading-snug">{item.title}</h3>
              
              <div className="space-y-1.5 text-xs text-slate-400">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.location}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.beneficiaries}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-medium">Allocated Budget</p>
                <p className="font-bold text-white font-mono">{item.budget}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
