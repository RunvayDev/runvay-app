import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Order from "@/models/Order";
import Session from "@/models/Session";
import { auth } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  try {
    await connectMongo();

    const sessionFromCookie = await auth();

    if (!sessionFromCookie) {
      return NextResponse.json(
        { error: "SessionId header is missing" },
        { status: 400 },
      );
    }

    const sessionId = sessionFromCookie.user?.id;
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return NextResponse.json(
        { message: "Invalid or expired session" },
        { status: 401 },
      );
    }
    // console.log(session.userId);
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // console.log(user);

    const orders = await Order.find({ user: user._id })
      .populate("user", "name email")
      .populate("items.product", "name price images");

    // console.log(orders);

    return NextResponse.json(orders);
  } catch (err) {
    if (err instanceof Error) {
      // console.error("Order fetching error:", err);
      return NextResponse.json(
        { message: "Failed to fetch Orders" },
        { status: 500 },
      );
    }
  }
}
