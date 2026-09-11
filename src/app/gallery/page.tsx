"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Filter,
  Maximize2,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

interface GalleryItem {
  id: string;
  title: string;
  category: "Education" | "Healthcare" | "Food Relief" | "Women Empowerment" | "Community";
  filename: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Vidya Deevena Study Material Handover", category: "Education", filename: "13-2.jpg", caption: "Notebook and study kit distribution to students during Vidya Deevena tutoring sessions." },
  { id: "g2", title: "Annadhanam Meal Distribution Drive", category: "Food Relief", filename: "14.jpg", caption: "Hot nutritious meal distribution organized by Yuvatejam volunteers." },
  { id: "g3", title: "Free Rural Eye & Diagnostic Medical Camp", category: "Healthcare", filename: "21.jpg", caption: "Doctor examining elderly villager during our free health checkup drive." },
  { id: "g4", title: "Women Vocational Tailoring Workshop", category: "Women Empowerment", filename: "1-1024x1024.jpg", caption: "Handover of sewing machines and certified tailoring training completion." },
  { id: "g5", title: "Krishna River Basin Flood Relief Drive", category: "Community", filename: "2-1.jpg", caption: "Supplying clean drinking water canisters and dry rations to flood-affected villagers." },
  { id: "g6", title: "Study Guide Center Book Distribution", category: "Education", filename: "IMG-20250204-WA0100.jpg", caption: "Students holding their study guides with Dr. Shaik Karimulla and teachers at the study center." },
  { id: "g7", title: "Independence Day Celebrations & Ration Drive", category: "Community", filename: "18.jpg", caption: "Community celebration and ration distribution at trust headquarters Vuyyuru." },
  { id: "g8", title: "Rural Village Diagnostic Health Camp", category: "Healthcare", filename: "10.jpg", caption: "Free blood pressure, sugar, and general wellness tests in remote village center." },
  { id: "g9", title: "School Kit & Uniform Handover Ceremony", category: "Education", filename: "11.jpg", caption: "Distribution of notebooks, bags, and stationery sets to meritorious students." },
  { id: "g10", title: "Community Food Relief Van", category: "Food Relief", filename: "12.jpg", caption: "Freshly cooked hygienic meals delivered directly to government hospital attendees." },
  { id: "g11", title: "Women Skill Development Group", category: "Women Empowerment", filename: "1-1.jpg", caption: "Graduates of our 3-month tailoring and embroidery batch displaying stitched garments." },
  { id: "g12", title: "Trust Executive Volunteer Coordination", category: "Community", filename: "Newteam.jpg", caption: "Field volunteers and trustees coordinating weekly social service routes." },
];

const SUPABASE_BASE = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ["All", "Education", "Healthcare", "Food Relief", "Women Empowerment", "Community"];

  const filtered = selectedCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <PublicHeader />

      <main className="flex-grow space-y-12 pb-16">
        {/* HERO SECTION */}
        <section className="bg-slate-950 text-white py-16 md:py-20 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center space-x-1.5 font-bold rounded-full uppercase px-3.5 py-1 text-xs bg-red-600/20 text-red-400 border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Visual Archive</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Yuvatejam Trust Photo Gallery
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Explore documented moments of our grassroots social welfare, education camps, nutrition drives, and community transformation across Andhra Pradesh.
            </p>
          </div>
        </section>

        {/* FILTER BUTTONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* PHOTO GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => {
              const url = `${SUPABASE_BASE}${item.filename}`;

              return (
                <div
                  key={item.id}
                  onClick={() => setActivePhoto(item)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <Image
                      src={url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-red-600 uppercase shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={`${SUPABASE_BASE}${activePhoto.filename}`}
                  alt={activePhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full border border-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase text-amber-400">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activePhoto.title}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    {activePhoto.caption}
                  </p>
                </div>

                <a
                  href={`${SUPABASE_BASE}${activePhoto.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold self-start sm:self-center transition-colors"
                >
                  <span>Open High-Res</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
