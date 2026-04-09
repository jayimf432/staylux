import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isDashboard = pathname.startsWith("/dashboard");
  const isHost = pathname.startsWith("/host");
  const isAdmin = pathname.startsWith("/admin");

  // Redirect unauthenticated users to login
  if ((isDashboard || isHost || isAdmin) && !isLoggedIn) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin-only routes
  if (isAdmin && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Host routes require HOST or ADMIN role
  if (isHost && role === "GUEST") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/host/:path*",
    "/admin/:path*",
  ],
};
