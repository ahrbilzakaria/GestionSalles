import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the userToken cookie from the request headers
  const token = request.cookies.get("userToken");

  // Check if the token exists
  if (!token) {
    // If no token, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*", // Apply middleware to the dashboard routes
};
