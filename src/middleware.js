import { NextResponse } from "next/server";

export function middleware(request) {
  // Retrieve the userToken cookie
  const token = request.cookies.get("userToken");

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Parse the token (assumes it's a JSON string)
    const user = JSON.parse(token.value);

    // Define role-based allowed paths
    const allowedPaths = {
      RESPONSABLE_SALLES: new Set([
        "/dashboard/home",
        "/dashboard/manage-rooms",
        "/dashboard/notifications",
      ]),
      COORDINATEUR: new Set([
        "/dashboard/home",
        "/dashboard/manage-filieres",
        "/dashboard/manage-matieres",
        "/dashboard/notifications",
      ]),
      PROFESSEUR: new Set([
        "/dashboard/home",
        "/dashboard/reservation_requests",
        "/dashboard/notifications",
      ]),
    };

    // Get the requested path
    const pathname = new URL(request.url).pathname;

    // Check access for the user's role
    if (!allowedPaths[user.role]?.has(pathname)) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    // Authorized, proceed with the request
    return NextResponse.next();
  } catch {
    // Redirect to login on parsing or validation error
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*", // Apply middleware to dashboard routes
};
