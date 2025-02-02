import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: Request) {
  const session = await auth();
  const { pathname } = new URL(req.url);

  // If user is logged in and tries to access the signin page, redirect them to home
  if (session?.user && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: ["/signin", "/signup"], // Apply middleware only to these routes
};
