"use client";

import React from "react";
import { Settings, Save, ShieldCheck, Database, Globe } from "lucide-react";

export default function SiteSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Settings className="w-6 h-6 text-slate-400" />
            <span>Site Configuration &amp; Settings</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Global YUVATEJAM TRUST organization configuration and API preferences.
          </p>
        </div>

        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
        <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Organization Public Metadata</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="block text-slate-400 font-semibold">Trust Name</label>
            <input
              type="text"
              readOnly
              value="YUVATEJAM TRUST"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-400 font-semibold">Legal Entity Name</label>
            <input
              type="text"
              readOnly
              value="Yuvatejam Educational & Social Service Trust"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-400 font-semibold">Registration Number</label>
            <input
              type="text"
              readOnly
              value="Regd. No. 124/2012"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-400 font-semibold">Canonical Domain</label>
            <input
              type="text"
              readOnly
              value="https://yuvatejamtrust.org"
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
        <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Connected Infrastructure Credentials</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-slate-300">Public Production Website URL</span>
            <p className="font-mono text-emerald-400">https://yuvatejam-trust.vercel.app</p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-slate-300">Supabase API Base</span>
            <p className="font-mono text-emerald-400">https://ywrgxzulhmklohdsdsme.supabase.co</p>
          </div>
        </div>
      </div>
    </div>
  );
}
