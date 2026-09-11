"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  ShieldAlert,
  RefreshCw,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import { ToastContainer, ToastMessage } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { AdminRole } from "@/types/admin";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership" | "Executive" | "Committee";
  image: string;
  bio: string;
  sortOrder: number;
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Dr. SHAIK Karimulla",
    role: "Founder & Chairman",
    category: "Leadership",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg",
    bio: "Founding Chairman leading social welfare, education, healthcare, and rural empowerment initiatives since 2012.",
    sortOrder: 1,
  },
  {
    id: "2",
    name: "S. Abdul Baseed",
    role: "Treasurer & Executive Member",
    category: "Executive",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/S.Abdul-BaseedTreasurer-1014x1024.jpg",
    bio: "Oversees financial management, audit compliance, 80G tax receipts, and resource deployment.",
    sortOrder: 2,
  },
  {
    id: "3",
    name: "Executive Committee Body",
    role: "Core Trust Management",
    category: "Committee",
    image: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Newteam.jpg",
    bio: "Active executive body driving field volunteer coordination and disaster response across Krishna District.",
    sortOrder: 3,
  },
];

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userRole, setUserRole] = useState<AdminRole>("SUPER_ADMIN");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"Leadership" | "Executive" | "Committee">("Executive");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  useEffect(() => {
    const role = (localStorage.getItem("yt_admin_role") as AdminRole) || "SUPER_ADMIN";
    setUserRole(role);

    const handleRoleUpdate = () => {
      const updated = (localStorage.getItem("yt_admin_role") as AdminRole) || "SUPER_ADMIN";
      setUserRole(updated);
    };
    window.addEventListener("yt_admin_role_changed", handleRoleUpdate);
    return () => window.removeEventListener("yt_admin_role_changed", handleRoleUpdate);
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setName("");
    setRole("");
    setCategory("Executive");
    setImage("https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg");
    setBio("");
    setSortOrder(members.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (m: TeamMember) => {
    setEditingMember(m);
    setName(m.name);
    setRole(m.role);
    setCategory(m.category);
    setImage(m.image);
    setBio(m.bio);
    setSortOrder(m.sortOrder);
    setModalOpen(true);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return addToast("error", "Member Name is required.");
    if (!role.trim()) return addToast("error", "Role Title is required.");

    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? { ...m, name, role, category, image, bio, sortOrder }
            : m
        )
      );
      addToast("success", `Team member "${name}" updated!`);
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name,
        role,
        category,
        image,
        bio,
        sortOrder,
      };
      setMembers((prev) => [...prev, newMember]);
      addToast("success", `New team member "${name}" added!`);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    addToast("success", `Team member "${deleteTarget.name}" deleted.`);
    setDeleteTarget(null);
  };

  const isReadOnly = userRole === "VIEWER";
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Team Member"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This record will be removed.`}
        confirmLabel="Delete Member"
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Team Members &amp; Leadership</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage trustees, executive committee body, project heads, and advisors.
          </p>
        </div>

        {!isReadOnly && (
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member name or role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Total Members: <span className="text-white font-bold">{filtered.length}</span>
        </div>
      </div>

      {/* 5 STATES HANDLING */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading team members database...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/60 border border-red-800 rounded-2xl text-center space-y-2">
          <ShieldAlert className="w-8 h-8 text-red-400 mx-auto" />
          <p className="text-sm font-bold text-white">Database Error</p>
          <p className="text-xs text-red-300">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
          <Users className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">No team members found</p>
          <p className="text-xs text-slate-400">Try adjusting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 flex flex-col items-center hover:border-emerald-500/50 transition-colors relative group"
            >
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

              {!isReadOnly && (
                <div className="pt-3 border-t border-slate-800/80 w-full flex items-center justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(m)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                    title="Edit Member"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(m)}
                    className="p-1.5 bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                    title="Delete Member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-300">Member Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. SHAIK Karimulla"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300">Designation / Role Title *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Founder & Chairman"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Executive">Executive</option>
                    <option value="Committee">Committee</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">Display Order</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300">Profile Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300">Biography / Overview</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
