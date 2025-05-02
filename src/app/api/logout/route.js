import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  // Clear the auth token cookie
  response.cookies.delete("token", "", { expires: new Date(0), path: "/" });

  return response;
}
