"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Search,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Info,
  ShieldAlert,
  Upload,
  Trash2,
  X,
  FileText,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { ToastContainer, ToastMessage } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface MediaRecord {
  id: string;
  filename: string;
  original_filename: string;
  storage_bucket: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  file_size: number;
  usedIn: string[];
}

const SUPABASE_BASE_URL = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/";
const SUPABASE_UPLOAD_URL = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/yuvatejam-media/images/";
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Media Usage Mapping
const MEDIA_USAGE_MAP: Record<string, string[]> = {
  "3-1024x767.jpg": ["Education Page", "Happenings & Events"],
  "14.jpg": ["Home Page", "Annadhanam Relief"],
  "18.jpg": ["Happenings & Events", "About Us"],
  "1-1024x1024.jpg": ["Women Empowerment", "Focus Areas"],
  "2-1.jpg": ["Disaster Relief", "Happenings & Events"],
  "Dr.SHAIK-karimulla-Founder-and-Chairman.jpg": ["Home Page", "Our Team", "About Us"],
  "S.Abdul-BaseedTreasurer-1014x1024.jpg": ["Our Team"],
  "Newteam.jpg": ["Our Team", "Home Page"],
};

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaRecord | null>(null);

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);
  const [inUseWarningModal, setInUseWarningModal] = useState<{ isOpen: boolean; mediaName: string; pages: string[] }>({
    isOpen: false,
    mediaName: "",
    pages: [],
  });
  const [deleting, setDeleting] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/list/yuvatejam-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prefix: "images",
          limit: 500,
          sortBy: { column: "name", order: "asc" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const records: MediaRecord[] = data.map((item: { name: string; metadata?: { size?: number; mimetype?: string } }, idx: number) => ({
          id: String(idx + 1),
          filename: item.name,
          original_filename: item.name,
          storage_bucket: "yuvatejam-media",
          storage_path: `images/${item.name}`,
          public_url: `${SUPABASE_BASE_URL}images/${item.name}`,
          mime_type: item.metadata?.mimetype || (item.name.endsWith(".png") ? "image/png" : item.name.endsWith(".webp") ? "image/webp" : "image/jpeg"),
          file_size: item.metadata?.size || 0,
          usedIn: MEDIA_USAGE_MAP[item.name] || [],
        }));
        setMediaList(records);
      } else {
        addToast("error", "Failed to fetch storage objects from Supabase.");
      }
    } catch (err) {
      console.error("Error fetching media:", err);
      addToast("error", "Network error while connecting to Supabase Storage.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    addToast("success", "Public CDN URL copied to clipboard!");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        addToast("error", "File size exceeds maximum limit of 10 MB.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      const cleanFileName = selectedFile.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const uploadUrl = `${SUPABASE_UPLOAD_URL}${cleanFileName}`;

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      });

      if (res.ok) {
        addToast("success", `File "${cleanFileName}" uploaded successfully to yuvatejam-media bucket!`);
        setUploadModalOpen(false);
        setSelectedFile(null);
        fetchMedia();
      } else {
        addToast("error", "Failed to upload file to Supabase Storage.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      addToast("error", "Network error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleAttemptDelete = (item: MediaRecord) => {
    if (item.usedIn && item.usedIn.length > 0) {
      // Safe Deletion Guard: Asset is currently referenced
      setInUseWarningModal({
        isOpen: true,
        mediaName: item.filename,
        pages: item.usedIn,
      });
      return;
    }
    setDeleteTarget(item);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const deleteUrl = `https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/yuvatejam-media/${deleteTarget.storage_path}`;
      const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (res.ok) {
        addToast("success", `Asset "${deleteTarget.filename}" deleted from Storage.`);
        setMediaList((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      } else {
        addToast("error", "Failed to delete asset from Supabase Storage.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      addToast("error", "Network error while deleting media asset.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(search.toLowerCase()) ||
      item.mime_type.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "image" && item.mime_type.startsWith("image/")) ||
      (typeFilter === "doc" && !item.mime_type.startsWith("image/"));

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Media Asset"
        message={`Are you sure you want to permanently delete "${deleteTarget?.filename}" from Supabase Storage?`}
        confirmLabel={deleting ? "Deleting..." : "Delete Asset"}
        isDanger={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Used In Warning Modal */}
      {inUseWarningModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center space-x-2 text-amber-400 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-sm text-white">Protected Asset — Currently In Use</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The image <span className="font-mono text-emerald-400 font-bold">{inUseWarningModal.mediaName}</span> is currently referenced by <span className="font-bold text-white">{inUseWarningModal.pages.length} public pages</span>:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
              {inUseWarningModal.pages.map((p, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-amber-400/90 font-medium">
              Deletion is blocked to prevent broken images on live public pages. Please remove this image from the referencing pages first.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInUseWarningModal({ isOpen: false, mediaName: "", pages: [] })}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
              >
                Understand &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            <span>Supabase Media Library</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Browse, upload, track page usage, and manage objects in the <span className="font-mono text-emerald-400">yuvatejam-media</span> bucket.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Media</span>
          </button>

          <button
            onClick={fetchMedia}
            disabled={loading}
            className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Bucket</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by filename or type..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
          >
            <option value="all">All Asset Types</option>
            <option value="image">Images Only</option>
            <option value="doc">Documents Only</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-bold">{filteredMedia.length}</span> of <span className="text-white font-bold">{mediaList.length}</span> assets
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto opacity-80" />
          <p className="text-xs text-slate-400">Loading Supabase media assets...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300"
            >
              <div
                onClick={() => setSelectedMedia(item)}
                className="relative aspect-square w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center"
              >
                {item.mime_type.startsWith("image/") ? (
                  <Image
                    src={item.public_url}
                    alt={item.filename}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <FileText className="w-10 h-10 text-slate-600" />
                )}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-slate-900/90 text-white px-2 py-1 rounded-md border border-slate-700">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-2 text-xs">
                <p className="font-bold text-slate-200 truncate" title={item.filename}>
                  {item.filename}
                </p>

                {/* Used In Indicator */}
                {item.usedIn.length > 0 ? (
                  <div className="text-[10px] text-emerald-400 font-semibold truncate flex items-center space-x-1">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    <span>Used in {item.usedIn.length} pages</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500 font-medium">Unreferenced</div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2">
                  <button
                    onClick={() => handleCopy(item.public_url)}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAttemptDelete(item)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <a
                      href={item.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      title="Open Direct Link"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Media Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload Asset to Supabase Storage</span>
              </h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-800 hover:border-emerald-500/60 bg-slate-950 rounded-2xl p-6 text-center cursor-pointer space-y-2 transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,application/pdf"
                />
                <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-white">
                  {selectedFile ? selectedFile.name : "Click or drag file to upload"}
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors flex items-center space-x-2"
                >
                  {uploading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{uploading ? "Uploading..." : "Start Upload"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white truncate max-w-[300px]">
                {selectedMedia.filename}
              </h3>
              <button onClick={() => setSelectedMedia(null)} className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 bg-slate-800 rounded-lg">
                Close
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              {selectedMedia.mime_type.startsWith("image/") ? (
                <Image src={selectedMedia.public_url} alt={selectedMedia.filename} fill className="object-contain" />
              ) : (
                <FileText className="w-16 h-16 text-slate-600" />
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <span className="text-slate-500 font-medium">Public CDN URL:</span>{" "}
                <span className="font-mono text-emerald-400 break-all">{selectedMedia.public_url}</span>
              </p>
              <p>
                <span className="text-slate-500 font-medium">Used In Pages:</span>{" "}
                <span className="font-bold text-white">
                  {selectedMedia.usedIn.length > 0 ? selectedMedia.usedIn.join(", ") : "None (Unreferenced)"}
                </span>
              </p>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => handleCopy(selectedMedia.public_url)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Public URL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
