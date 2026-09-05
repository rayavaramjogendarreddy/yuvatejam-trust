import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-brand-red rounded-full">
          <span className="text-3xl font-black">404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved. Return to the homepage to explore Yuvatejam Trust initiatives.
        </p>
        <div className="pt-2 flex justify-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-darkRed text-white text-sm font-bold px-6 py-3 rounded-full shadow transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
