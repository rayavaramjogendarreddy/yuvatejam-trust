"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Images, Upload, Search, Trash2, Eye, ShieldCheck } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  album: string;
  date: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "1", title: "Vidya Deevena Tutoring Handover", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/3-1024x767.jpg", album: "Education", date: "2026-08-15" },
  { id: "2", title: "Annadhanam Meal Distribution", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg", album: "Food Relief", date: "2026-08-15" },
  { id: "3", title: "Independence Day Celebrations", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/18.jpg", album: "Events", date: "2026-08-15" },
  { id: "4", title: "Women Empowerment Workshop", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg", album: "Empowerment", date: "2026-07-20" },
  { id: "5", title: "Flood Relief Cans Distribution", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/2-1.jpg", album: "Relief", date: "2026-07-10" },
  { id: "6", title: "Founder Chairman Dr. Karimulla", url: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg", album: "Leadership", date: "2026-06-01" },
];

export default function GalleryPage() {
  const [photos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [search, setSearch] = useState("");

  const filtered = photos.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.album.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Images className="w-6 h-6 text-emerald-400" />
            <span>Photo &amp; Media Gallery</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage public website photo albums, featured event highlights, and media sliders.
          </p>
        </div>

        <button className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Gallery Photos</span>
        </button>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search album or title..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Gallery Photos: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group space-y-3 p-3">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
              <Image src={item.url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">{item.album}</span>
                <span>{item.date}</span>
              </div>
              <h4 className="font-bold text-xs text-white truncate" title={item.title}>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
