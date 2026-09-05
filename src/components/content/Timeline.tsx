"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  className?: string;
}

export default function Timeline({ items, title, className = "" }: TimelineProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`py-8 space-y-8 ${className}`}>
      {title && (
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
      )}

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node Point */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 bg-white border-2 border-brand-red text-brand-red rounded-full p-1 shadow-sm group-hover:bg-brand-red group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-black text-brand-red uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100">
                  {item.year}
                </span>
                {item.badge && (
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-red transition-colors">
                {item.title}
              </h4>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
