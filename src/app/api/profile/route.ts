import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import User from "@/models/User";
import Profile from "@/models/Profile";
import Order from "@/models/Order"; // Import the Order model

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { error: "Name parameter is missing" },
        { status: 400 },
      );
    }

    await connectMongo();

    // Find the user by name
    const user = await User.findOne({ name });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the profile associated with the user and populate the orders
    const profile = await Profile.findOne({ user: user._id }).populate({
      path: "orders",
      model: Order, // Explicitly specify the model for population
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
