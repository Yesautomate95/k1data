import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Ensure secret key is properly encoded as a Uint8Array
const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get token from cookies

  const isLoginPage = req.nextUrl.pathname === "/login";
  const isHome = req.nextUrl.pathname === "/";
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/services"); // Protect `/services/*` routes

  if (!token && isProtectedRoute) {
    console.log("redirected to login page");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!token && isHome) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET_KEY);
      if (isLoginPage || isHome) {
        return NextResponse.redirect(new URL("/services/k1-ocr", req.url)); // Redirect if already logged in
      }
    } catch (error) {
      console.log("error", error);
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect invalid token
    }
  }

  return NextResponse.next();
}
export const config = {};
