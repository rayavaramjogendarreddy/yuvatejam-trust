import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedPath = path.startsWith("/dashboard");
  const isLoginPage = path === "/login";

  const sessionCookie = request.cookies.get("admin_session")?.value;
  const isAuthenticated = Boolean(sessionCookie);

  // Unauthenticated user attempting to access protected dashboard routes
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated user attempting to access login page
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
