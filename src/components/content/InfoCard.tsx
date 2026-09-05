import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

interface InfoCardProps {
  className?: string;
}

export default function InfoCard({ className = "" }: InfoCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 h-auto ${className}`}
    >
      <h4 className="font-bold text-slate-900 text-base border-l-3 border-brand-red pl-2.5">
        Need Assistance?
      </h4>
      <p className="text-xs text-slate-600 leading-relaxed">
        Have questions about our initiatives, child sponsorship, or how to get involved?
      </p>

      <div className="space-y-2.5 text-xs font-semibold text-slate-700 pt-1">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Reg. No: {siteConfig.registrationNo}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Tax Exemption Available</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 font-normal">
          <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
          <span>{siteConfig.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 font-normal">
          <Mail className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
          <span>{siteConfig.email}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-50">
        <Link
          href="/contact-us/"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-red hover:text-brand-darkRed transition-colors"
        >
          <span>Get in touch with us</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
