
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Parse JSON body

    // Hardcoded credentials
    const hardcodedEmail = "nakul@yesautomate.com";
  const hardcodedPasswordHash = "$2b$12$s036PT3t1fnHlW.b7jj.J.tyLwd5RGCwLKgPUBZAu1k5E8J8btmWO"; //Yesautomate@98993#

    if (email !== hardcodedEmail) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, hardcodedPasswordHash);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });


      // Set HTTP-Only Cookie
     await   cookies().set("token", token, {
        httpOnly: true,  // Secure, not accessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

    return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
