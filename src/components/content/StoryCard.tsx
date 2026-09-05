import SafeImage from "@/components/ui/SafeImage";
import { Quote } from "lucide-react";

interface StoryCardProps {
  quote: string;
  author: string;
  role?: string;
  imageSrc?: string;
  className?: string;
}

export default function StoryCard({
  quote,
  author,
  role,
  imageSrc,
  className = "",
}: StoryCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-amber-50/50 via-white to-red-50/30 rounded-2xl p-6 md:p-8 border border-red-100 shadow-sm space-y-4 relative overflow-hidden ${className}`}
    >
      <Quote className="w-8 h-8 text-brand-red/20 absolute top-4 right-4" />
      
      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed relative z-10">
        &quot;{quote}&quot;
      </p>

      <div className="flex items-center space-x-3 pt-2 border-t border-slate-100">
        {imageSrc && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-red/30 flex-shrink-0">
            <SafeImage src={imageSrc} alt={author} fill className="object-cover" />
          </div>
        )}
        <div>
          <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-none">
            {author}
          </h5>
          {role && (
            <span className="text-[11px] text-slate-500 font-medium leading-none block mt-1">
              {role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
