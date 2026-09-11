"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  Users,
  UserCheck,
  Mail,
  Heart,
  Globe,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  Sparkles,
  User,
  Check,
} from "lucide-react";
import { AdminRole } from "@/types/admin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole>("SUPER_ADMIN");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("yt_admin_role") as AdminRole;
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, []);

  const handleRoleChange = (role: AdminRole) => {
    setCurrentRole(role);
    localStorage.setItem("yt_admin_role", role);
    setRoleDropdownOpen(false);
    // Notify components of role update
    window.dispatchEvent(new Event("yt_admin_role_changed"));
  };

  const handleLogout = async () => {
    try {
      // Clear authentication cookies
      document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.removeItem("yt_admin_role");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, minRole: "VIEWER" },
    { label: "Pages", href: "/dashboard/pages", icon: FileText, minRole: "EDITOR" },
    { label: "Programs", href: "/dashboard/programs", icon: Briefcase, minRole: "EDITOR" },
    { label: "Media Library", href: "/dashboard/media", icon: ImageIcon, minRole: "VIEWER" },
    { label: "Team Members", href: "/dashboard/team-members", icon: Users, minRole: "ADMIN" },
    { label: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck, minRole: "ADMIN" },
    { label: "Enquiries", href: "/dashboard/enquiries", icon: Mail, minRole: "ADMIN" },
    { label: "Donations", href: "/dashboard/donations", icon: Heart, minRole: "VIEWER" },
    { label: "SEO Metadata", href: "/dashboard/seo", icon: Globe, minRole: "ADMIN" },
    { label: "Site Settings", href: "/dashboard/settings", icon: Settings, minRole: "SUPER_ADMIN" },
    { label: "Users & Roles", href: "/dashboard/users", icon: Shield, minRole: "SUPER_ADMIN" },
  ];

  const roleHierarchy: Record<AdminRole, number> = {
    VIEWER: 1,
    EDITOR: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
  };

  const visibleNavItems = navItems.filter(
    (item) => roleHierarchy[currentRole] >= roleHierarchy[item.minRole as AdminRole]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs">
            YT
          </div>
          <span className="font-bold text-sm tracking-tight text-white">YUVATEJAM ADMIN</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Component */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col justify-between z-20`}
      >
        <div className="p-4 space-y-6">
          {/* Logo & Portal Branding */}
          <div className="hidden md:flex items-center justify-between px-2 py-3 border-b border-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center font-black text-white text-sm shadow-md">
                YT
              </div>
              <div>
                <h2 className="font-extrabold text-sm tracking-tight text-white leading-none">
                  YUVATEJAM TRUST
                </h2>
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>

          {/* Quick link to public website */}
          <div className="px-1">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Public Website ↗</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md shadow-red-900/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Role Selector */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3">
          <div className="relative">
            <div
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-red-950 border border-red-800/60 flex items-center justify-center font-bold text-[10px] text-red-400 flex-shrink-0">
                  {currentRole.slice(0, 2)}
                </div>
                <div className="truncate">
                  <p className="text-[11px] font-bold text-white truncate">{currentRole}</p>
                  <p className="text-[9px] text-slate-400 truncate">Role Switcher</p>
                </div>
              </div>
              <User className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {roleDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1 z-50">
                <p className="text-[9px] font-bold uppercase text-slate-500 px-2 py-1">Select Active RBAC Role</p>
                {(["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"] as AdminRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                      currentRole === r ? "bg-red-950 text-red-300 font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{r}</span>
                    {currentRole === r && <Check className="w-3 h-3 text-red-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-red-950/60 border border-slate-700 hover:border-red-800 text-slate-300 hover:text-red-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Link href="/dashboard" className="hover:text-white">Admin</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold capitalize">
              {pathname.replace("/dashboard/", "").replace("/dashboard", "Overview")}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-300 font-medium">Role:</span>
              <span className="font-bold text-amber-400">{currentRole}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next.js 15 App Router</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
