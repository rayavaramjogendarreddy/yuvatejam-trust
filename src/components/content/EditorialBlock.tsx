"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface EditorialBlockProps {
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}

export default function EditorialBlock({
  title,
  lead,
  children,
  className = "",
}: EditorialBlockProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-8 space-y-6 ${className}`}
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight border-l-2 border-emerald-500/50 pl-4">
          {title}
        </h2>
      )}

      {lead && (
        <p className="text-slate-800 font-medium text-base sm:text-lg leading-relaxed text-balance">
          {lead}
        </p>
      )}

      <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
        {children}
      </div>
    </motion.section>
  );
}
