"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Search, Heart, RefreshCw, Award, FileText, CheckCircle2 } from "lucide-react";
import { getDonations, DonationRecord } from "@/lib/trustData";

export default function DonationsPage() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [search, setSearch] = useState("");

  const refreshData = () => {
    setDonations(getDonations());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("yt_data_updated", refreshData);
    return () => window.removeEventListener("yt_data_updated", refreshData);
  }, []);

  const filtered = donations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.program.toLowerCase().includes(search.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.panNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <span>Donations &amp; 80G Tax Receipts</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Track live donor contributions, verified 80G tax exemption certificates, and program fund allocation.
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-xl text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Contributions Recorded
          </span>
          <span className="text-lg font-black text-emerald-400 font-mono">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Search & Counter */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search donor name, receipt #, or PAN..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Records: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">80G Receipt #</th>
                <th className="px-5 py-3.5">Donor Name</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Program / Cause</th>
                <th className="px-5 py-3.5">Donor PAN</th>
                <th className="px-5 py-3.5">Payment Mode</th>
                <th className="px-5 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-red-400 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{d.receiptNumber}</span>
                  </td>
                  <td className="px-5 py-4 font-bold text-white text-sm">{d.donorName}</td>
                  <td className="px-5 py-4 font-mono text-emerald-400 font-bold text-sm">
                    ₹{d.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-300">{d.program}</td>
                  <td className="px-5 py-4 font-mono text-slate-400 uppercase">{d.panNumber}</td>
                  <td className="px-5 py-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                      {d.paymentMethod}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
