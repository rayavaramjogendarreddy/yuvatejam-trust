"use client";

import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedSplitProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  badgeText?: string;
  highlights?: string[];
  ctaLink?: string;
  ctaText?: string;
  reversed?: boolean;
}

export default function FeaturedSplit({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  badgeText,
  highlights,
  ctaLink,
  ctaText = "Learn More",
  reversed = false,
}: FeaturedSplitProps) {
  return (
    <div className="py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Visual Media Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 group">
            <div className="relative aspect-[4/3] w-full">
              <SafeImage
                src={imageSrc}
                alt={imageAlt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            {badgeText && (
              <div className="absolute top-4 left-4">
                <Badge variant="primary" size="md" className="bg-white/95 backdrop-blur-md shadow-md text-brand-red font-bold">
                  {badgeText}
                </Badge>
              </div>
            )}
          </div>
        </motion.div>

        {/* Narrative Copy Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`lg:col-span-6 space-y-5 ${reversed ? "lg:order-1" : "lg:order-2"}`}
        >
          {subtitle && (
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red block">
              {subtitle}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {description}
          </p>

          {highlights && highlights.length > 0 && (
            <div className="space-y-2.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-slate-700 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {ctaLink && (
            <div className="pt-3">
              <Link
                href={ctaLink}
                className="inline-flex items-center space-x-2 text-sm font-bold text-brand-red hover:text-brand-darkRed transition-colors group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
