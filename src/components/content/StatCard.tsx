import { Award } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  subtext?: string;
  className?: string;
}

export default function StatCard({ value, label, subtext, className = "" }: StatCardProps) {
  return (
    <div
      className={`bg-slate-50/80 rounded-2xl p-5 md:p-6 border border-slate-200/70 space-y-2 flex flex-col justify-between hover:border-emerald-500/40 transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl md:text-3xl font-black text-brand-navy tracking-tight">
          {value}
        </span>
        <div className="p-2 bg-red-50 text-brand-red rounded-xl">
          <Award className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h4 className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
          {label}
        </h4>
        {subtext && (
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
