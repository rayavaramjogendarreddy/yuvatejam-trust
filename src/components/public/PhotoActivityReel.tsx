"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

export function PhotoActivityReel() {
  const images = [
    { src: "IMG-20250204-WA0100.jpg", title: "Vidya Deevena Study Center", tag: "Education" },
    { src: "14.jpg", title: "Annadhanam Food Distribution", tag: "Food Relief" },
    { src: "21.jpg", title: "Free Rural Health & Eye Camp", tag: "Healthcare" },
    { src: "1-1024x1024.jpg", title: "Women Vocational Tailoring", tag: "Livelihood" },
    { src: "2-1.jpg", title: "Flood Relief Supply Drive", tag: "Disaster Relief" },
    { src: "13-2.jpg", title: "Study Books & Stationery Handover", tag: "Education" },
    { src: "18.jpg", title: "Independence Day Gathering", tag: "Community" },
    { src: "15.jpg", title: "Child Welfare & Activity Kit", tag: "Child Protection" },
  ];

  const duplicated = [...images, ...images];
  const BASE_URL = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/";

  return (
    <section className="space-y-6 overflow-hidden py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-red-600" />
          <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">
            Live Field Operations Gallery
          </h4>
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
        >
          <span>View All 134+ Photos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee space-x-4 flex">
          {duplicated.map((item, idx) => (
            <div
              key={idx}
              className="relative w-64 h-44 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-slate-200 group bg-slate-100"
            >
              <Image
                src={`${BASE_URL}${item.src}`}
                alt={item.title}
                fill
                sizes="256px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3">
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase self-start shadow-sm mb-1">
                  {item.tag}
                </span>
                <p className="text-white text-xs font-bold truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
