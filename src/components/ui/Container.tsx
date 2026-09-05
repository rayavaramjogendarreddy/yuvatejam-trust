import { HTMLAttributes, forwardRef } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", size = "default", children, ...props }, ref) => {
    const sizeStyles = {
      narrow: "max-w-4xl",
      default: "max-w-7xl",
      wide: "max-w-8xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={`${sizeStyles[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";
