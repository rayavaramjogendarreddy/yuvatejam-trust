"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ImageIcon,
  Search,
  Upload,
  Check,
  X,
  RefreshCw,
  FileText,
  Plus,
} from "lucide-react";

export interface SelectedMediaAsset {
  url: string;
  filename: string;
  altText: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (asset: SelectedMediaAsset) => void;
  currentSelectedUrl?: string;
}

interface MediaItem {
  id: string;
  filename: string;
  public_url: string;
  mime_type: string;
  file_size: number;
}

const SUPABASE_BASE_URL = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/public/yuvatejam-media/";
const SUPABASE_UPLOAD_URL = "https://ywrgxzulhmklohdsdsme.supabase.co/storage/v1/object/yuvatejam-media/images/";
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelectMedia,
  currentSelectedUrl,
}: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [altText, setAltText] = useState("");

  // Quick Upload Tab/State
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchStorageMedia = React.useCallback(async () => {
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
        const records: MediaItem[] = data.map((item: { name: string; metadata?: { size?: number; mimetype?: string } }, idx: number) => ({
          id: String(idx + 1),
          filename: item.name,
          public_url: `${SUPABASE_BASE_URL}images/${item.name}`,
          mime_type: item.metadata?.mimetype || (item.name.endsWith(".png") ? "image/png" : "image/jpeg"),
          file_size: item.metadata?.size || 0,
        }));
        setMediaList(records);

        // Pre-select if matches current url
        if (currentSelectedUrl) {
          const matched = records.find((r) => r.public_url === currentSelectedUrl);
          if (matched) {
            setSelectedItem(matched);
            setAltText(matched.filename.split(".")[0].replace(/[-_]/g, " "));
          }
        }
      }
    } catch (err) {
      console.error("Storage list error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentSelectedUrl]);

  useEffect(() => {
    if (isOpen) {
      fetchStorageMedia();
    }
  }, [isOpen, fetchStorageMedia]);

  if (!isOpen) return null;

  const handleSelectConfirm = () => {
    if (!selectedItem) return;
    onSelectMedia({
      url: selectedItem.public_url,
      filename: selectedItem.filename,
      altText: altText || selectedItem.filename,
    });
    onClose();
  };

  const handleQuickUpload = async (e: React.FormEvent) => {
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
          "Content-Type": selectedFile.type || "image/jpeg",
        },
        body: selectedFile,
      });

      if (res.ok) {
        const publicUrl = `${SUPABASE_BASE_URL}images/${cleanFileName}`;
        onSelectMedia({
          url: publicUrl,
          filename: cleanFileName,
          altText: cleanFileName.split(".")[0].replace(/[-_]/g, " "),
        });
        onClose();
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const filteredMedia = mediaList.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-5 relative shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-4">
            <h3 className="font-extrabold text-base text-white flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              <span>Select Image from Media Library</span>
            </h3>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab("library")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  activeTab === "library" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Browse Media
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors flex items-center space-x-1 ${
                  activeTab === "upload" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>Upload New</span>
              </button>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {activeTab === "library" ? (
          <div className="flex-1 flex flex-col min-h-0 space-y-4 overflow-hidden">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search images by filename..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Grid Area */}
            <div className="flex-1 overflow-y-auto pr-1">
              {loading ? (
                <div className="py-20 text-center space-y-2">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-xs text-slate-400">Loading Supabase Storage catalog...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {filteredMedia.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedItem(item);
                          setAltText(item.filename.split(".")[0].replace(/[-_]/g, " "));
                        }}
                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all bg-slate-950 ${
                          isSelected
                            ? "border-emerald-400 ring-2 ring-emerald-500/30 scale-95"
                            : "border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <Image
                          src={item.public_url}
                          alt={item.filename}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected Image Metadata & Action Footer */}
            {selectedItem && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-3 overflow-hidden w-full sm:w-auto">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-800">
                    <Image src={selectedItem.public_url} alt={selectedItem.filename} fill className="object-cover" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-white truncate">{selectedItem.filename}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <label className="text-[10px] text-slate-400 uppercase font-semibold">Alt Text:</label>
                      <input
                        type="text"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Image description..."
                        className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-emerald-500 w-48 sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSelectConfirm}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
                  >
                    Use Selected Image
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quick Upload Form Tab */
          <form onSubmit={handleQuickUpload} className="space-y-4 text-xs py-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-emerald-500/60 bg-slate-950 rounded-2xl p-10 text-center cursor-pointer space-y-3"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                className="hidden"
                accept="image/*"
              />
              <Upload className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">
                {selectedFile ? selectedFile.name : "Choose an image file to upload"}
              </p>
              <p className="text-xs text-slate-400">
                Uploaded image will automatically register in Supabase Storage and be selected.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("library")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
              >
                Back to Library
              </button>
              <button
                type="submit"
                disabled={!selectedFile || uploading}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-950/40"
              >
                {uploading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{uploading ? "Uploading..." : "Upload & Select"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
