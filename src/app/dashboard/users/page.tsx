"use client";

import React from "react";
import { ShieldCheck, UserPlus, Shield, Lock, CheckCircle2 } from "lucide-react";

export default function UserRolesPage() {
  const users = [
    {
      id: "usr_1",
      email: "admin@yuvatejamtrust.org",
      fullName: "Super Admin",
      role: "SUPER_ADMIN",
      status: "Active",
      lastActive: "Just now",
    },
    {
      id: "usr_2",
      email: "editor@yuvatejamtrust.org",
      fullName: "Content Editor",
      role: "EDITOR",
      status: "Active",
      lastActive: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>User &amp; Role Management</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Server-side Role-Based Access Control (RBAC) &amp; Row Level Security (RLS) enforcement.
          </p>
        </div>

        <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md">
          <UserPlus className="w-4 h-4" />
          <span>Invite Admin User</span>
        </button>
      </div>

      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start space-x-3 text-xs text-slate-300">
        <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white">Server-Side Authorization Rules</p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Users cannot assign or elevate their own roles. All role permissions are checked against Supabase Auth session claims and RLS table policies.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Authorized Administrator Accounts
        </div>

        <div className="divide-y divide-slate-800">
          {users.map((u) => (
            <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400">
                  {u.role === "SUPER_ADMIN" ? "SA" : "ED"}
                </div>
                <div>
                  <p className="font-bold text-white">{u.fullName}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{u.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                    u.role === "SUPER_ADMIN"
                      ? "bg-amber-950 text-amber-400 border border-amber-800/80"
                      : "bg-blue-950 text-blue-400 border border-blue-800/80"
                  }`}
                >
                  {u.role}
                </span>

                <div className="flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{u.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
