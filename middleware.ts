import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Avoid stale HTML after deploys (CDN/browser holding an old home shell). */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  if (url.pathname === "/") {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
