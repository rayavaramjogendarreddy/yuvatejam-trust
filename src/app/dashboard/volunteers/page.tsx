"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Search, Filter, Mail, Phone, MapPin, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { getVolunteers, VolunteerRecord } from "@/lib/trustData";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([]);
  const [search, setSearch] = useState("");

  const refreshData = () => {
    setVolunteers(getVolunteers());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("yt_data_updated", refreshData);
    return () => window.removeEventListener("yt_data_updated", refreshData);
  }, []);

  const filtered = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()) ||
      v.interest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            <span>Volunteer Applications &amp; Roster</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Review community volunteer applications, assign field projects, and manage contact rosters.
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
            placeholder="Search volunteer name or city..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Applicants: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Volunteer Name</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Interest Area</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-bold text-white text-sm">{v.name}</td>
                  <td className="px-5 py-4 space-y-0.5 text-slate-400">
                    <p className="flex items-center space-x-1.5"><Mail className="w-3 h-3 text-slate-500" /><span>{v.email}</span></p>
                    <p className="flex items-center space-x-1.5"><Phone className="w-3 h-3 text-slate-500" /><span>{v.phone}</span></p>
                  </td>
                  <td className="px-5 py-4 text-slate-400 flex items-center space-x-1 mt-3">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{v.location}</span>
                  </td>
                  <td className="px-5 py-4 font-medium text-emerald-400">{v.interest}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold ${v.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950 text-amber-400 border border-amber-800/60'}`}>
                      {v.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{v.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{v.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
