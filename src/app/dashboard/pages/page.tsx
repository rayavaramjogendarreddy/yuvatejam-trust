"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Globe,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ImageIcon,
  Image as LucideImage,
} from "lucide-react";
import { ToastContainer, ToastMessage } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { MediaPickerModal, SelectedMediaAsset } from "@/components/media/MediaPickerModal";

export interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft" | "archived";
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  lastModified: string;
  views: number;
  author: string;
}

const INITIAL_PAGES: PageItem[] = [
  { id: "1", title: "Home Page", slug: "/", status: "published", content: "Welcome to Yuvatejam Trust", excerpt: "Official Homepage", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/14.jpg", featuredImageAlt: "Yuvatejam Trust Annadhanam", seoTitle: "YUVATEJAM TRUST - Educational & Social Service", metaDescription: "Empowering rural communities through education, health, and livelihood.", lastModified: "2026-09-05", views: 14200, author: "Dr. SHAIK Karimulla" },
  { id: "2", title: "About Us", slug: "/about-us", status: "published", content: "About Yuvatejam Educational & Social Service Trust", excerpt: "History, vision and core values", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/Dr.SHAIK-karimulla-Founder-and-Chairman.jpg", featuredImageAlt: "Founder Dr SHAIK Karimulla", seoTitle: "About Us | Yuvatejam Trust", metaDescription: "Learn about our founding story, vision, and mission.", lastModified: "2026-09-04", views: 3120, author: "Admin" },
  { id: "3", title: "Key Focus Areas", slug: "/key-focus-areas", status: "published", content: "Education, Health, Women Empowerment, Disaster Relief", excerpt: "Our key community pillars", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg", featuredImageAlt: "Women Empowerment Workshop", seoTitle: "Focus Areas | Yuvatejam Trust", metaDescription: "Discover our key initiatives in rural development.", lastModified: "2026-09-03", views: 2450, author: "Admin" },
  { id: "4", title: "Educational Welfare", slug: "/educational-welfare", status: "published", content: "Vidya Deevena tutoring centers & bridge courses", excerpt: "Free non-formal tutoring for rural kids", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/3-1024x767.jpg", featuredImageAlt: "Vidya Deevena Students", seoTitle: "Education Welfare | Yuvatejam Trust", metaDescription: "Providing free education support to underprivileged children.", lastModified: "2026-09-02", views: 1890, author: "Editor" },
  { id: "5", title: "Health Services & Medical Camps", slug: "/health-services", status: "published", content: "Free medical checkups & blood donation camps", excerpt: "Rural healthcare initiatives", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/2-1.jpg", featuredImageAlt: "Rural Medical Camp", seoTitle: "Health Services | Yuvatejam Trust", metaDescription: "Free medical checkups and health camps in Krishna District.", lastModified: "2026-09-01", views: 1450, author: "Admin" },
  { id: "6", title: "Women Empowerment", slug: "/women-empowerment", status: "published", content: "Tailoring kits & micro-enterprise training", excerpt: "Vocational skill development", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/1-1024x1024.jpg", featuredImageAlt: "Tailoring Kit Handover", seoTitle: "Women Empowerment | Yuvatejam Trust", metaDescription: "Empowering rural women with self-reliance skill training.", lastModified: "2026-08-28", views: 1210, author: "Editor" },
  { id: "7", title: "Happenings & Annual Report 2026", slug: "/happenings", status: "draft", content: "Recent event highlights and project milestones", excerpt: "Latest trust updates", featuredImage: "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/images/18.jpg", featuredImageAlt: "Independence Day Celebration", seoTitle: "Happenings | Yuvatejam Trust", metaDescription: "News and annual report of Yuvatejam Trust activities.", lastModified: "2026-09-05", views: 430, author: "Super Admin" },
];

export default function PagesManagementPage() {
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [status, setStatus] = useState<"published" | "draft" | "archived">("draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Media Picker Modal State
  const [pickerOpen, setPickerOpen] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const openCreateModal = () => {
    setEditingPage(null);
    setTitle("");
    setSlug("/");
    setContent("");
    setExcerpt("");
    setFeaturedImage("");
    setFeaturedImageAlt("");
    setStatus("draft");
    setSeoTitle("");
    setMetaDescription("");
    setModalOpen(true);
  };

  const openEditModal = (page: PageItem) => {
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setContent(page.content);
    setExcerpt(page.excerpt);
    setFeaturedImage(page.featuredImage || "");
    setFeaturedImageAlt(page.featuredImageAlt || "");
    setStatus(page.status);
    setSeoTitle(page.seoTitle);
    setMetaDescription(page.metaDescription);
    setModalOpen(true);
  };

  const handleMediaSelected = (asset: SelectedMediaAsset) => {
    setFeaturedImage(asset.url);
    setFeaturedImageAlt(asset.altText || asset.filename);
    addToast("success", `Image "${asset.filename}" attached to page!`);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return addToast("error", "Page Title is required.");
    if (!slug.trim()) return addToast("error", "Page Slug is required.");

    const formattedSlug = slug.startsWith("/") ? slug : `/${slug}`;
    const todayStr = new Date().toISOString().split("T")[0];

    if (editingPage) {
      setPages((prev) =>
        prev.map((p) =>
          p.id === editingPage.id
            ? {
                ...p,
                title,
                slug: formattedSlug,
                content,
                excerpt,
                featuredImage,
                featuredImageAlt,
                status,
                seoTitle: seoTitle || title,
                metaDescription: metaDescription || excerpt,
                lastModified: todayStr,
              }
            : p
        )
      );
      addToast("success", `Page "${title}" updated successfully!`);
    } else {
      const newPage: PageItem = {
        id: Date.now().toString(),
        title,
        slug: formattedSlug,
        content,
        excerpt,
        featuredImage,
        featuredImageAlt,
        status,
        seoTitle: seoTitle || title,
        metaDescription: metaDescription || excerpt,
        lastModified: todayStr,
        views: 0,
        author: "Admin User",
      };
      setPages((prev) => [newPage, ...prev]);
      addToast("success", `New page "${title}" created successfully!`);
    }

    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setPages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    addToast("success", `Page "${deleteTarget.title}" deleted.`);
    setDeleteTarget(null);
  };

  const toggleStatus = (page: PageItem) => {
    const newStatus = page.status === "published" ? "draft" : "published";
    setPages((prev) =>
      prev.map((p) => (p.id === page.id ? { ...p, status: newStatus } : p))
    );
    addToast("info", `Page "${page.title}" status changed to ${newStatus.toUpperCase()}`);
  };

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Page Record"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete Page"
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <MediaPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelectMedia={handleMediaSelected}
        currentSelectedUrl={featuredImage}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <span>Website Pages Management</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage static routes, dynamic pages, featured media attachments, and SEO metadata.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-950/40"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search page title or slug..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-bold">{filteredPages.length}</span> of <span className="text-white font-bold">{pages.length}</span> pages
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Featured Image</th>
                <th className="px-5 py-3.5">Page Title &amp; Route</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Last Modified</th>
                <th className="px-5 py-3.5">Total Traffic</th>
                <th className="px-5 py-3.5">Author</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                      {page.featuredImage ? (
                        <Image src={page.featuredImage} alt={page.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <LucideImage className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-bold text-white text-sm">{page.title}</p>
                      <p className="font-mono text-emerald-400 text-[11px] flex items-center space-x-1 mt-0.5">
                        <Globe className="w-3 h-3 text-slate-500" />
                        <span>{page.slug}</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleStatus(page)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80 ${
                        page.status === "published"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                          : "bg-amber-950/80 text-amber-400 border border-amber-800/60"
                      }`}
                    >
                      {page.status}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-slate-400">{page.lastModified}</td>
                  <td className="px-5 py-4 font-mono text-slate-300">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-slate-400">{page.author}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(page)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="Edit Page Record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(page)}
                        className="p-1.5 bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`https://yuvatejam-trust.vercel.app${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition-colors"
                        title="Open Live Public Site Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Page Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{editingPage ? "Edit Page Record" : "Create New Page"}</span>
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-300">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingPage) {
                        setSlug(`/${e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
                      }
                    }}
                    placeholder="e.g. Healthcare Camp"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-300">URL Route Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. /healthcare-camp"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* FEATURED IMAGE PICKER SECTION */}
              <div className="space-y-2 p-4 bg-slate-950 border border-slate-800/80 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-white flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                    <span>Featured Header Image</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center space-x-1"
                  >
                    <LucideImage className="w-3 h-3" />
                    <span>{featuredImage ? "Change Image" : "Select Image"}</span>
                  </button>
                </div>

                {featuredImage ? (
                  <div className="flex items-center space-x-4 pt-2 border-t border-slate-800/60">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0">
                      <Image src={featuredImage} alt="Featured" fill className="object-cover" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="font-mono text-emerald-400 text-[11px] truncate">{featuredImage.split("/").pop()}</p>
                      <input
                        type="text"
                        value={featuredImageAlt}
                        onChange={(e) => setFeaturedImageAlt(e.target.value)}
                        placeholder="Image Alt text (accessibility)..."
                        className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFeaturedImage("");
                        setFeaturedImageAlt("");
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Remove Featured Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">No featured image attached yet.</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-300">Publication Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-300">SEO Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-300">Page Excerpt / Summary</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-300">Page Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40"
                >
                  {editingPage ? "Save Changes" : "Create Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
