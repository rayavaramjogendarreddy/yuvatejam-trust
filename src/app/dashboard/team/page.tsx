"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Plus, Search, Mail, Phone, Edit3 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Executive" | "Committee";
  image: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Dr. SHAIK Karimulla",
    role: "Founder & Chairman",
    category: "Leadership",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg",
    bio: "Founding Chairman leading social welfare, education, healthcare, and rural empowerment initiatives since 2012.",
  },
  {
    id: "2",
    name: "S. Abdul Baseed",
    role: "Treasurer & Executive Member",
    category: "Executive",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/S.Abdul-BaseedTreasurer-1014x1024.jpg",
    bio: "Oversees financial management, audit compliance, 80G tax receipts, and resource deployment.",
  },
  {
    id: "3",
    name: "Executive Committee Body",
    role: "Core Trust Management",
    category: "Committee",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Newteam.jpg",
    bio: "Active executive body driving field volunteer coordination and disaster response across Krishna District.",
  },
];

export default function TeamPage() {
  const [members] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [search, setSearch] = useState("");

  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Team Members &amp; Leadership</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage trust trustees, executive committee members, advisors, and field coordinators.
          </p>
        </div>

        <button className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Team Members: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 shadow-xl bg-slate-950">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/60 uppercase">
                {m.category}
              </span>
              <h3 className="font-bold text-base text-white mt-1">{m.name}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{m.role}</p>
              <p className="text-slate-400 text-xs leading-relaxed pt-2">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
