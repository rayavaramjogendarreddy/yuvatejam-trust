"use client";

import React, { useState } from "react";
import { Search, Save, CheckCircle2, Globe } from "lucide-react";

export default function SeoPage() {
  const [siteTitle, setSiteTitle] = useState("YUVATEJAM TRUST - Educational & Social Service");
  const [metaDescription, setMetaDescription] = useState("Empowering Rural Communities through Education, Health, and Social Welfare Services in Krishna District, AP.");
  const [canonicalUrl, setCanonicalUrl] = useState("https://yuvatejamtrust.org/");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
          <Globe className="w-6 h-6 text-emerald-400" />
          <span>SEO &amp; Search Engine Metadata</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Configure site-wide meta titles, Open Graph tags, and Schema.org JSON-LD structured data.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl flex items-center space-x-2 text-emerald-300 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>SEO Metadata updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Default Site Title Tag</label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Meta Description</label>
          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Production Canonical Base URL</label>
          <input
            type="text"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
