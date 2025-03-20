import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // If the user is not authenticated and trying to access a protected route
    if (!request.nextauth.token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes should be protected
export const config = {
  matcher: ["/posts/:path*", "/users/:path*"],
};