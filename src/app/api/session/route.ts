 import { NextResponse } from "next/server";
import {auth} from "@/lib/auth"// Update path to your NextAuth configuration

export async function GET() {
  try {
    const session = await auth(); // Retrieves the session
    if (session) {
      return NextResponse.json(session); // Respond with session data
    } else {
      return NextResponse.json({ user: null }); // Respond with no user if session is not available
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
