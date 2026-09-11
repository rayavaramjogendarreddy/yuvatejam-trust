"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-800 text-emerald-200"
              : toast.type === "error"
              ? "bg-red-950/90 border-red-800 text-red-200"
              : "bg-slate-900/90 border-slate-700 text-slate-200"
          }`}
        >
          <div className="flex items-center space-x-3 text-xs font-semibold">
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            <span>{toast.text}</span>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-3"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
