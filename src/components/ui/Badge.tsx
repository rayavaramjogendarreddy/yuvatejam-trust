import React, { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "success";
  size?: "sm" | "md";
}

export function Badge({
  className = "",
  variant = "primary",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center space-x-1.5 font-semibold rounded-full tracking-wider uppercase transition-colors";
  
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3.5 py-1 text-xs",
  };

  const variantStyles = {
    primary: "bg-brand-red/10 text-brand-red border border-brand-red/20",
    secondary: "bg-brand-navy/10 text-brand-navy border border-brand-navy/20",
    gold: "bg-brand-gold/15 text-amber-700 border border-brand-gold/30",
    outline: "bg-transparent text-slate-600 border border-slate-300",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
