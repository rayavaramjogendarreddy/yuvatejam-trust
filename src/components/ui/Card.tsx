import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "flat" | "ghost" | "editorial" | "gradient";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", hover = true, children, ...props }, ref) => {
    const baseStyles = "transition-all duration-300 h-auto flex flex-col overflow-hidden";
    
    const variants = {
      default: "bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-900",
      outline: "bg-white rounded-2xl border border-slate-200 text-slate-900",
      flat: "bg-slate-50/70 rounded-2xl border border-slate-100/80 text-slate-900 shadow-none",
      gradient: "bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl",
      ghost: "bg-slate-50/80 rounded-2xl border border-slate-100 text-slate-800",
      editorial: "bg-transparent border-l-2 border-emerald-500/50 pl-5 py-1 text-slate-900 rounded-none shadow-none",
    };

    const hoverStyles = hover && variant !== "editorial" && variant !== "flat" ? "hover:shadow-md hover:-translate-y-0.5" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pb-3 space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-3 flex-1 space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-3 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
}
